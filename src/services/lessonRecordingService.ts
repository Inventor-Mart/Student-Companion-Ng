/**
 * Lesson Recording & Cloud Dispatch Service
 * Handles uploading live session recordings directly to:
 * 1. Google Drive (dedicated "Student Companion - Live Lessons" folder)
 * 2. YouTube Channel (unlisted/public educational video)
 * Target Account: studentcompanion.ng@gmail.com
 */

export interface DriveUploadResult {
  fileId: string;
  fileName: string;
  webViewLink: string;
  webContentLink?: string;
  folderId: string;
}

export interface YouTubeUploadResult {
  videoId: string;
  watchUrl: string;
  embedUrl: string;
  title: string;
  privacyStatus: string;
}

export interface RecordingMetadata {
  topic: string;
  subject?: string;
  level?: string;
  tutorName?: string;
  sessionDate?: string;
  notesSummary?: string;
}

/**
 * Searches for or creates a dedicated folder in the user's Google Drive.
 */
export async function getOrCreateDriveFolder(
  accessToken: string,
  folderName: string = 'Student Companion - Live Lessons'
): Promise<string> {
  const query = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)&spaces=drive`;

  const searchRes = await fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!searchRes.ok) {
    const err = await searchRes.json().catch(() => ({}));
    throw new Error(`Failed to query Google Drive folders: ${err.error?.message || searchRes.statusText}`);
  }

  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id;
  }

  // Create folder if it doesn't exist
  const createRes = await fetch('https://www.googleapis.com/drive/v3/files?fields=id,name', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      description: 'Automated video recordings of Student Companion live classroom lessons'
    })
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(`Failed to create Google Drive folder: ${err.error?.message || createRes.statusText}`);
  }

  const createData = await createRes.json();
  return createData.id;
}

/**
 * Uploads a lesson video blob to Google Drive using multipart upload.
 */
export async function uploadLessonToGoogleDrive(
  accessToken: string,
  videoBlob: Blob,
  metadata: RecordingMetadata,
  onProgress?: (percent: number) => void
): Promise<DriveUploadResult> {
  // 1. Ensure folder exists in Drive
  onProgress?.(5);
  const folderId = await getOrCreateDriveFolder(accessToken);
  onProgress?.(15);

  const safeTopic = (metadata.topic || 'Classroom_Lesson').replace(/[^a-zA-Z0-9_\- ]/g, '').trim();
  const dateStr = new Date().toISOString().split('T')[0];
  const extension = videoBlob.type.includes('mp4') ? 'mp4' : 'webm';
  const fileName = `Lesson_${safeTopic}_${dateStr}.${extension}`;

  const description = [
    `🇳🇬 Student Companion Live Lesson Recording`,
    `Topic: ${metadata.topic}`,
    `Subject: ${metadata.subject || 'STEM Secondary Studies'}`,
    `Class Level: ${metadata.level || 'Senior Secondary (SS1 - SS3)'}`,
    `Tutor: ${metadata.tutorName || 'Student Companion Tutor'}`,
    `Date: ${new Date().toLocaleString('en-NG')}`,
    `Destination Account: studentcompanion.ng@gmail.com`
  ].join('\n');

  // 2. Prepare Multipart Body
  const boundary = `-------314159265358979323846`;
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const fileMetadata = {
    name: fileName,
    mimeType: videoBlob.type || 'video/webm',
    parents: [folderId],
    description
  };

  const metadataPart = `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(fileMetadata)}\r\n`;
  const mediaHeader = `${delimiter}Content-Type: ${videoBlob.type || 'video/webm'}\r\n\r\n`;

  // Create composite blob
  const multipartBlob = new Blob(
    [metadataPart, mediaHeader, videoBlob, closeDelimiter],
    { type: `multipart/related; boundary=${boundary}` }
  );

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'POST',
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,webContentLink'
    );
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          // Progress from 15% to 95%
          const percent = Math.round(15 + (e.loaded / e.total) * 80);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.(100);
        try {
          const res = JSON.parse(xhr.responseText);
          resolve({
            fileId: res.id,
            fileName: res.name || fileName,
            webViewLink: res.webViewLink || `https://drive.google.com/file/d/${res.id}/view`,
            webContentLink: res.webContentLink,
            folderId
          });
        } catch (err) {
          reject(new Error('Failed to parse Google Drive response'));
        }
      } else {
        let msg = `Google Drive upload failed with status ${xhr.status}`;
        try {
          const err = JSON.parse(xhr.responseText);
          if (err.error?.message) msg = err.error.message;
        } catch {}
        reject(new Error(msg));
      }
    };

    xhr.onerror = () => reject(new Error('Network error uploading to Google Drive'));
    xhr.send(multipartBlob);
  });
}

/**
 * Uploads a lesson video blob to the connected YouTube channel using Resumable Upload.
 */
export async function uploadLessonToYouTube(
  accessToken: string,
  videoBlob: Blob,
  metadata: RecordingMetadata,
  privacyStatus: 'unlisted' | 'private' | 'public' = 'unlisted',
  onProgress?: (percent: number) => void
): Promise<YouTubeUploadResult> {
  const safeTopic = metadata.topic || 'Classroom Lesson';
  const dateStr = new Date().toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' });
  const title = `Student Companion: ${safeTopic} (${dateStr})`;

  const description = [
    `🇳🇬 Live Secondary School Lesson delivered on Student Companion Nigeria.`,
    `Topic: ${metadata.topic}`,
    `Subject: ${metadata.subject || 'General STEM'}`,
    `Class Level: ${metadata.level || 'WAEC / JAMB / NECO SSCE'}`,
    `Tutor: ${metadata.tutorName || 'Certified Tutor'}`,
    `Official Channel: studentcompanion.ng@gmail.com`,
    `Visit platform: https://studentcompanion.ng`,
    `\n#StudentCompanion #WAEC #JAMB #NECO #NigeriaEducation`
  ].join('\n');

  const tags = [
    'StudentCompanion',
    'WAEC',
    'JAMB',
    'NECO',
    'NigeriaEducation',
    (metadata.subject || 'Maths').replace(/\s+/g, ''),
    'SecondarySchool'
  ];

  // 1. Initialize Resumable Upload Session
  onProgress?.(5);
  const initRes = await fetch(
    'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Upload-Content-Length': String(videoBlob.size),
        'X-Upload-Content-Type': videoBlob.type || 'video/webm'
      },
      body: JSON.stringify({
        snippet: {
          title: title.substring(0, 100),
          description,
          tags,
          categoryId: '27' // Category 27 = Education
        },
        status: {
          privacyStatus,
          selfDeclaredMadeForKids: false
        }
      })
    }
  );

  if (!initRes.ok) {
    const err = await initRes.json().catch(() => ({}));
    throw new Error(`Failed to initialize YouTube video upload: ${err.error?.message || initRes.statusText}`);
  }

  const uploadUrl = initRes.headers.get('Location');
  if (!uploadUrl) {
    throw new Error('YouTube did not return a valid resumable upload location header.');
  }

  onProgress?.(15);

  // 2. Upload Video Binary Chunks
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round(15 + (e.loaded / e.total) * 80);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.(100);
        try {
          const res = JSON.parse(xhr.responseText);
          const videoId = res.id;
          resolve({
            videoId,
            watchUrl: `https://youtu.be/${videoId}`,
            embedUrl: `https://www.youtube.com/embed/${videoId}`,
            title: res.snippet?.title || title,
            privacyStatus: res.status?.privacyStatus || privacyStatus
          });
        } catch (err) {
          reject(new Error('Failed to parse YouTube upload response'));
        }
      } else {
        let msg = `YouTube video upload failed with status ${xhr.status}`;
        try {
          const err = JSON.parse(xhr.responseText);
          if (err.error?.message) msg = err.error.message;
        } catch {}
        reject(new Error(msg));
      }
    };

    xhr.onerror = () => reject(new Error('Network error uploading video to YouTube channel'));
    xhr.send(videoBlob);
  });
}

/**
 * Fallback helper: triggers instant local download of the recording blob
 */
export function downloadLocalRecordingBlob(videoBlob: Blob, topic: string) {
  const safeTopic = (topic || 'Lesson').replace(/[^a-zA-Z0-9_\-]/g, '_');
  const dateStr = new Date().toISOString().replace(/[:.]/g, '-');
  const extension = videoBlob.type.includes('mp4') ? 'mp4' : 'webm';
  const fileName = `StudentCompanion_${safeTopic}_${dateStr}.${extension}`;

  const url = URL.createObjectURL(videoBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
