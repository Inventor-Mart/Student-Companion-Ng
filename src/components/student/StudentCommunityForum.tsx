import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ForumChannel, ForumMessage, ForumReport } from '../../types';
import {
  INITIAL_FORUM_CHANNELS,
  getStoredForumMessages,
  saveStoredForumMessages,
  getStoredForumReports,
  saveStoredForumReports
} from '../../data/forumData';
import { analyzeMessageSecurity } from '../../utils/securityGuard';
import {
  MessageSquare,
  GraduationCap,
  Trophy,
  Users,
  Send,
  Flag,
  CornerDownRight,
  X,
  AlertTriangle,
  CheckCircle2,
  ThumbsUp,
  Lightbulb,
  Flame,
  Award,
  Sparkles,
  ShieldCheck,
  School,
  Lock
} from 'lucide-react';

export const StudentCommunityForum: React.FC = () => {
  const { student, currentUser, openStudentSubscriptionModal, checkStudentFeatureAccess, submitSecurityReport } = useApp();

  // Channels for students
  const studentChannels = useMemo(() => {
    return INITIAL_FORUM_CHANNELS.filter(c => c.audience === 'student');
  }, []);

  const [activeChannelId, setActiveChannelId] = useState<string>(studentChannels[0]?.id || 'student-academics');
  const [messages, setMessages] = useState<ForumMessage[]>(() => getStoredForumMessages());
  const [inputText, setInputText] = useState('');
  const [inputWarning, setInputWarning] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<ForumMessage | null>(null);

  // Reporting modal state
  const [reportingMessage, setReportingMessage] = useState<ForumMessage | null>(null);
  const [reportReason, setReportReason] = useState<ForumReport['reason']>('bullying');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Filter messages for current active channel
  const currentChannel = studentChannels.find(c => c.id === activeChannelId) || studentChannels[0];
  const channelMessages = messages.filter(m => m.channelId === activeChannelId);

  // Handle reaction toggle
  const handleToggleReaction = (msgId: string, reactionType: 'thumbsUp' | 'lightbulb' | 'fire' | 'clap') => {
    const currentUserId = currentUser?.uid || student.id || 'current-student';
    setMessages(prev => {
      const updated = prev.map(msg => {
        if (msg.id !== msgId) return msg;
        const currentList = msg.reactions[reactionType] || [];
        const hasReacted = currentList.includes(currentUserId);
        const updatedList = hasReacted
          ? currentList.filter(id => id !== currentUserId)
          : [...currentList, currentUserId];

        return {
          ...msg,
          reactions: {
            ...msg.reactions,
            [reactionType]: updatedList
          }
        };
      });
      saveStoredForumMessages(updated);
      return updated;
    });
  };

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Run safety, anti-spam burst, phishing link & profanity screening
    const senderId = currentUser?.uid || student.id || 'my-student-id';
    const filterResult = analyzeMessageSecurity(inputText, senderId, {
      userId: senderId,
      userEmail: currentUser?.email || undefined,
      userRole: 'student',
      location: `student_forum:${activeChannelId}`
    });
    if (!filterResult.isClean) {
      setInputWarning(filterResult.warningMessage || 'Please review your message for community safety.');
      return;
    }

    setInputWarning(null);

    const newMsg: ForumMessage = {
      id: `msg-${Date.now()}`,
      channelId: activeChannelId,
      senderId: currentUser?.uid || student.id || 'my-student-id',
      senderName: student.name || 'Scholar Student',
      senderRole: 'student',
      senderClassLevel: student.classLevel,
      senderRank: student.rank,
      senderSchool: student.school,
      text: filterResult.sanitizedText,
      reactions: {
        thumbsUp: [],
        lightbulb: [],
        fire: [],
        clap: []
      },
      replyToId: replyingTo?.id,
      replyToText: replyingTo ? (replyingTo.text.length > 60 ? `${replyingTo.text.slice(0, 60)}...` : replyingTo.text) : undefined,
      createdAt: 'Just now'
    };

    setMessages(prev => {
      const updated = [...prev, newMsg];
      saveStoredForumMessages(updated);
      return updated;
    });
    setInputText('');
    setReplyingTo(null);
  };

  // Submit report
  const handleSubmitReport = () => {
    if (!reportingMessage) return;

    // Create report record for Super Admin moderation
    const newReport: ForumReport = {
      id: `rep-${Date.now()}`,
      messageId: reportingMessage.id,
      channelId: reportingMessage.channelId,
      reportedUserId: reportingMessage.senderId,
      reportedUserName: reportingMessage.senderName,
      reporterUserId: currentUser?.uid || student.id || 'current-student',
      messageText: reportingMessage.text,
      reason: reportReason,
      status: 'pending',
      createdAt: 'Just now'
    };

    const existingReports = getStoredForumReports();
    saveStoredForumReports([newReport, ...existingReports]);

    void submitSecurityReport({
      category: reportReason === 'spam' ? 'spam' : 'abuse',
      suspectIdentifier: reportingMessage.senderName || reportingMessage.senderId,
      description: `Student Forum Report (${reportReason}): "${reportingMessage.text}"`,
      evidenceContext: `student_forum:${reportingMessage.channelId}`
    });

    // Mark as reported locally
    setMessages(prev => {
      const updated = prev.map(m => (m.id === reportingMessage.id ? { ...m, isReported: true } : m));
      saveStoredForumMessages(updated);
      return updated;
    });

    setReportSubmitted(true);
    setTimeout(() => {
      setReportingMessage(null);
      setReportSubmitted(false);
    }, 1400);
  };

  const getRankBadgeColor = (rank?: string) => {
    switch (rank) {
      case 'Senior Prefect':
      case 'Senior Boy':
      case 'Senior Girl':
        return 'bg-purple-950/80 text-purple-300 border-purple-700/60';
      case 'Prefect':
        return 'bg-amber-950/80 text-amber-300 border-amber-700/60';
      case 'Scholar':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
      default:
        return 'bg-blue-950/80 text-blue-300 border-blue-700/60';
    }
  };

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col bg-slate-950 text-slate-100 h-full overflow-hidden">
      {/* Top Header Banner */}
      <div className="bg-slate-900/95 border-b border-slate-800 px-4 py-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-950/50">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white">Student Scholar Community</h1>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-800/60 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Safe
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Connect with students nationwide across secondary school classes
              </p>
            </div>
          </div>
        </div>

        {/* Channel Selector Pills */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {studentChannels.map(ch => {
            const isActive = ch.id === activeChannelId;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  setActiveChannelId(ch.id);
                  setReplyingTo(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                }`}
              >
                {ch.category === 'academics' && <GraduationCap className="w-3.5 h-3.5" />}
                {ch.category === 'competitions' && <Trophy className="w-3.5 h-3.5" />}
                {ch.category === 'general' && <Users className="w-3.5 h-3.5" />}
                <span>{ch.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Channel Purpose Banner */}
      <div className="bg-slate-900/40 px-4 py-2 border-b border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between">
        <span className="truncate">{currentChannel.description}</span>
        <span className="text-[10px] text-emerald-400 font-medium shrink-0 ml-2">
          {channelMessages.length} messages
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-4 pb-12 space-y-3.5">
        {channelMessages.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500">
            <MessageSquare className="w-8 h-8 text-slate-600 mb-2" />
            <p className="text-xs font-semibold text-slate-400">No messages in this channel yet</p>
            <p className="text-[11px] text-slate-500 max-w-xs mt-1">
              Be the first scholar to ask an academic question or share a study tip!
            </p>
          </div>
        ) : (
          channelMessages.map(msg => {
            const currentUserId = currentUser?.uid || student.id || 'current-student';
            const isMe = msg.senderId === currentUserId;

            return (
              <div
                key={msg.id}
                className={`flex flex-col space-y-1.5 max-w-2xl ${
                  isMe ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                {/* Sender Metadata Header */}
                <div className="flex items-center gap-1.5 text-[11px] px-1">
                  <span className={`font-bold ${isMe ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {isMe ? 'You' : msg.senderName}
                  </span>
                  {msg.senderClassLevel && (
                    <span className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                      {msg.senderClassLevel}
                    </span>
                  )}
                  {msg.senderRank && (
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${getRankBadgeColor(msg.senderRank)}`}>
                      {msg.senderRank}
                    </span>
                  )}
                  <span className="text-slate-500 text-[10px]">· {msg.createdAt}</span>
                </div>

                {/* School tag if available */}
                {msg.senderSchool && !isMe && (
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 px-1">
                    <School className="w-3 h-3 text-slate-500" />
                    <span className="truncate max-w-xs">{msg.senderSchool}</span>
                  </div>
                )}

                {/* Reply snippet preview if this message is a reply */}
                {msg.replyToText && (
                  <div className="text-[11px] bg-slate-900/80 border-l-2 border-emerald-500 px-2.5 py-1 rounded text-slate-400 flex items-center gap-1.5 max-w-lg italic">
                    <CornerDownRight className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{msg.replyToText}</span>
                  </div>
                )}

                {/* Message Bubble Card */}
                <div
                  className={`relative p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-sm max-w-xl break-words ${
                    isMe
                      ? 'bg-emerald-950/80 text-emerald-50 border border-emerald-700/60 rounded-tr-sm'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Reaction counts and actions row */}
                  <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
                    {/* Reaction Badges */}
                    <div className="flex items-center gap-1">
                      {/* Thumbs Up */}
                      <button
                        onClick={() => handleToggleReaction(msg.id, 'thumbsUp')}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-medium transition-colors ${
                          msg.reactions.thumbsUp.includes(currentUserId)
                            ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700'
                            : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                        title="Agree / Like"
                      >
                        <ThumbsUp className="w-2.5 h-2.5" />
                        <span>{msg.reactions.thumbsUp.length || 0}</span>
                      </button>

                      {/* Lightbulb (Insightful) */}
                      <button
                        onClick={() => handleToggleReaction(msg.id, 'lightbulb')}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-medium transition-colors ${
                          msg.reactions.lightbulb.includes(currentUserId)
                            ? 'bg-amber-900/80 text-amber-300 border border-amber-700'
                            : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                        title="Helpful / Insightful"
                      >
                        <Lightbulb className="w-2.5 h-2.5" />
                        <span>{msg.reactions.lightbulb.length || 0}</span>
                      </button>

                      {/* Fire (Brilliant / Top-Notch) */}
                      <button
                        onClick={() => handleToggleReaction(msg.id, 'fire')}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-medium transition-colors ${
                          msg.reactions.fire.includes(currentUserId)
                            ? 'bg-rose-900/80 text-rose-300 border border-rose-700'
                            : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                        title="Fire / Top Notch"
                      >
                        <Flame className="w-2.5 h-2.5" />
                        <span>{msg.reactions.fire.length || 0}</span>
                      </button>

                      {/* Clap (Respect) */}
                      <button
                        onClick={() => handleToggleReaction(msg.id, 'clap')}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-medium transition-colors ${
                          msg.reactions.clap.includes(currentUserId)
                            ? 'bg-indigo-900/80 text-indigo-300 border border-indigo-700'
                            : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                        title="Respect / Well Done"
                      >
                        <Award className="w-2.5 h-2.5" />
                        <span>{msg.reactions.clap.length || 0}</span>
                      </button>
                    </div>

                    {/* Reply & Report actions */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <button
                        onClick={() => setReplyingTo(msg)}
                        className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                        title="Reply to message"
                      >
                        <CornerDownRight className="w-3 h-3" />
                        <span className="hidden sm:inline">Reply</span>
                      </button>

                      {!isMe && (
                        <button
                          onClick={() => setReportingMessage(msg)}
                          className="hover:text-rose-400 transition-colors p-1"
                          title="Report inappropriate content"
                        >
                          <Flag className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Compose Box (Bottom Fixed Bar) */}
      <div className="bg-slate-900/95 border-t border-slate-800 p-3 shrink-0">
        {/* Reply indicator */}
        {replyingTo && (
          <div className="mb-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-1.5 min-w-0">
              <CornerDownRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white">Replying to {replyingTo.senderName}:</span>
              <span className="truncate text-slate-400 italic text-[11px]">{replyingTo.text}</span>
            </div>
            <button
              onClick={() => setReplyingTo(null)}
              className="p-1 hover:text-white rounded text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Safety Warning if triggered */}
        {inputWarning && (
          <div className="mb-2 px-3 py-2 rounded-xl bg-amber-950/80 border border-amber-700/60 flex items-center gap-2 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{inputWarning}</span>
          </div>
        )}

        {(() => {
          const chatAccess = checkStudentFeatureAccess('chat');
          if (!chatAccess.hasAccess) {
            return (
              <div className="bg-slate-950 border border-amber-600/40 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-600/60 flex items-center justify-center text-amber-400 shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Student Academic Chat is Locked on Free Tier</h4>
                    <p className="text-[11px] text-slate-400">Upgrade to Basic Plan (₦8,000 / term) or above to post questions and participate in study discussions.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openStudentSubscriptionModal('basic')}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  Unlock with Basic (₦8,000)
                </button>
              </div>
            );
          }

          return (
            <form onSubmit={handleSendMessage} className="flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={e => {
                    setInputText(e.target.value);
                    if (inputWarning) setInputWarning(null);
                  }}
                  placeholder={`Post in #${currentChannel.title} (Max 500 characters)...`}
                  rows={2}
                  maxLength={500}
                  className="w-full bg-slate-950 text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 resize-none placeholder-slate-500"
                />
                <div className="absolute right-2.5 bottom-2 text-[10px] text-slate-500">
                  {inputText.length}/500
                </div>
              </div>

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white font-semibold transition-all shadow-md shadow-emerald-950/40 cursor-pointer shrink-0"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          );
        })()}
      </div>

      {/* Report Modal */}
      {reportingMessage && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-4 space-y-3.5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <Flag className="w-4 h-4" />
                <span>Report Inappropriate Content</span>
              </div>
              <button
                onClick={() => setReportingMessage(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {reportSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="text-sm font-bold text-white">Report Submitted</p>
                <p className="text-xs text-slate-400">
                  Thank you for keeping our scholar community safe. Our moderation team will review this message.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 italic">
                  &quot;{reportingMessage.text.slice(0, 100)}...&quot;
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Reason for reporting:
                  </label>
                  {[
                    { id: 'bullying', label: 'Bullying, Harassment, or Abuse' },
                    { id: 'inappropriate', label: 'Inappropriate or Vulgar Content' },
                    { id: 'spam', label: 'Spam, Gambling, or Scams' },
                    { id: 'contact_sharing', label: 'Solicitation or Contact Harvesting' }
                  ].map(item => (
                    <label
                      key={item.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-700/60 cursor-pointer text-xs text-slate-200"
                    >
                      <input
                        type="radio"
                        name="reportReason"
                        checked={reportReason === item.id}
                        onChange={() => setReportReason(item.id as any)}
                        className="text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setReportingMessage(null)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReport}
                    className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-950/40"
                  >
                    Submit Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
