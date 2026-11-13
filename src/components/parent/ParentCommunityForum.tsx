import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ForumMessage, ForumReport } from '../../types';
import {
  INITIAL_FORUM_CHANNELS,
  getStoredForumMessages,
  saveStoredForumMessages,
  getStoredForumReports,
  saveStoredForumReports
} from '../../data/forumData';
import { analyzeMessageSecurity } from '../../utils/securityGuard';
import { playSound } from '../../utils/audioSynthesis';
import { motion } from 'motion/react';
import {
  MessageSquare,
  HeartHandshake,
  Award,
  Coffee,
  Send,
  Flag,
  CornerDownRight,
  X,
  AlertTriangle,
  CheckCircle2,
  ThumbsUp,
  Lightbulb,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const ParentCommunityForum: React.FC = () => {
  const { currentUserProfile, currentUser, submitSecurityReport } = useApp();

  // Channels for parents
  const parentChannels = useMemo(() => {
    return INITIAL_FORUM_CHANNELS.filter(c => c.audience === 'parent');
  }, []);

  const [activeChannelId, setActiveChannelId] = useState<string>(parentChannels[0]?.id || 'parent-progress');
  const [messages, setMessages] = useState<ForumMessage[]>(() => getStoredForumMessages());
  const [inputText, setInputText] = useState('');
  const [inputWarning, setInputWarning] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<ForumMessage | null>(null);

  // Reporting modal state
  const [reportingMessage, setReportingMessage] = useState<ForumMessage | null>(null);
  const [reportReason, setReportReason] = useState<ForumReport['reason']>('bullying');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Filter messages for current active channel
  const currentChannel = parentChannels.find(c => c.id === activeChannelId) || parentChannels[0];
  const channelMessages = messages.filter(m => m.channelId === activeChannelId);

  // Handle reaction toggle
  const handleToggleReaction = (msgId: string, reactionType: 'thumbsUp' | 'lightbulb' | 'fire' | 'clap') => {
    playSound.tileTap();
    const currentUserId = currentUser?.uid || currentUserProfile?.id || 'current-parent';
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
    const senderId = currentUser?.uid || currentUserProfile?.id || 'my-parent-id';
    const filterResult = analyzeMessageSecurity(inputText, senderId, {
      userId: senderId,
      userEmail: currentUserProfile?.email || currentUser?.email || undefined,
      userRole: 'parent',
      location: `parent_forum:${activeChannelId}`
    });
    if (!filterResult.isClean) {
      playSound.buzz();
      setInputWarning(filterResult.warningMessage || 'Please review your message for community safety.');
      return;
    }

    playSound.correct();
    setInputWarning(null);

    const newMsg: ForumMessage = {
      id: `msg-par-${Date.now()}`,
      channelId: activeChannelId,
      senderId: currentUser?.uid || currentUserProfile?.id || 'my-parent-id',
      senderName: currentUserProfile?.fullName || 'Verified Parent',
      senderRole: 'parent',
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
    playSound.tileTap();

    const newReport: ForumReport = {
      id: `rep-${Date.now()}`,
      messageId: reportingMessage.id,
      channelId: reportingMessage.channelId,
      reportedUserId: reportingMessage.senderId,
      reportedUserName: reportingMessage.senderName,
      reporterUserId: currentUser?.uid || currentUserProfile?.id || 'current-parent',
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
      description: `Parent Forum Report (${reportReason}): "${reportingMessage.text}"`,
      evidenceContext: `parent_forum:${reportingMessage.channelId}`
    });

    setMessages(prev => {
      const updated = prev.map(m => (m.id === reportingMessage.id ? { ...m, isReported: true } : m));
      saveStoredForumMessages(updated);
      return updated;
    });

    playSound.correct();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportingMessage(null);
      setReportSubmitted(false);
    }, 1400);
  };

  return (
    <div className="flex-1 min-h-0 h-full w-full flex flex-col bg-[#101C34] text-slate-100 overflow-hidden rounded-3xl border-2 border-[#84CC16]/30 shadow-2xl">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-[#14203D] via-[#0F1B33] to-[#14203D] border-b border-slate-800 px-4 py-3.5 shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF5B00] to-[#E04F00] flex items-center justify-center text-white shadow-lg shadow-[#FF5B00]/25 shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm font-black text-white tracking-tight">Parents&apos; Discussion Lounge</h2>
                <span className="text-[10px] bg-[#84CC16]/15 text-[#84CC16] font-black px-2 py-0.5 rounded-lg border border-[#84CC16]/40 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Parents Only
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Share academic guidance, exam tips, and child progress insights with fellow Nigerian parents
              </p>
            </div>
          </div>
        </div>

        {/* Channel Selector Grid Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
          {parentChannels.map(ch => {
            const isActive = ch.id === activeChannelId;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  setActiveChannelId(ch.id);
                  setReplyingTo(null);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer active:scale-97 border ${
                  isActive
                    ? 'bg-[#84CC16] text-slate-950 border-[#A3E635] shadow-lg shadow-[#84CC16]/25'
                    : 'bg-[#0D1527] text-slate-300 hover:bg-[#18264A] hover:text-white border-slate-800'
                }`}
              >
                {ch.category === 'parenting' && <HeartHandshake className="w-3.5 h-3.5 shrink-0" />}
                {ch.category === 'exams' && <Award className="w-3.5 h-3.5 shrink-0" />}
                {ch.category === 'general' && <Coffee className="w-3.5 h-3.5 shrink-0" />}
                <span className="truncate">{ch.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Channel Purpose Strip */}
      <div className="bg-[#0D1527]/90 px-4 py-2 border-b border-slate-800/80 text-[11px] text-slate-300 flex items-center justify-between shrink-0">
        <span className="truncate">{currentChannel?.description}</span>
        <span className="text-[10px] text-[#FF5B00] font-black shrink-0 ml-2 uppercase tracking-wider">
          {channelMessages.length} contributions
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3.5 touch-pan-y">
        {channelMessages.length === 0 ? (
          <div className="h-56 flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <MessageSquare className="w-9 h-9 text-[#84CC16] mb-2 opacity-75" />
            <p className="text-xs font-bold text-white">No discussions in this lounge yet</p>
            <p className="text-[11px] text-slate-400 max-w-xs mt-1">
              Start a topic to ask for advice or share experiences on child academics!
            </p>
          </div>
        ) : (
          channelMessages.map((msg, idx) => {
            const currentUserId = currentUser?.uid || currentUserProfile?.id || 'current-parent';
            const isMe = msg.senderId === currentUserId;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.03, 0.2), duration: 0.25 }}
                className={`flex flex-col space-y-1.5 max-w-2xl ${
                  isMe ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                {/* Sender Metadata Header */}
                <div className="flex items-center gap-1.5 text-[11px] px-1">
                  <span className={`font-black ${isMe ? 'text-[#84CC16]' : 'text-white'}`}>
                    {isMe ? 'You' : msg.senderName}
                  </span>
                  <span className="text-[10px] font-bold bg-[#14203D] text-[#FF5B00] px-1.5 py-0.5 rounded-lg border border-[#FF5B00]/30 flex items-center gap-1">
                    <UserCheck className="w-2.5 h-2.5 text-[#FF5B00]" />
                    Verified Parent
                  </span>
                  <span className="text-slate-400 text-[10px]">· {msg.createdAt}</span>
                </div>

                {/* Reply snippet preview */}
                {msg.replyToText && (
                  <div className="text-[11px] bg-[#0D1527] border border-slate-700/80 px-2.5 py-1 rounded-xl text-slate-300 flex items-center gap-1.5 max-w-lg italic">
                    <CornerDownRight className="w-3 h-3 text-[#84CC16] shrink-0" />
                    <span className="truncate">{msg.replyToText}</span>
                  </div>
                )}

                {/* Message Bubble Card */}
                <div
                  className={`relative p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-md max-w-xl break-words ${
                    isMe
                      ? 'bg-[#18294A] text-white border-2 border-[#84CC16]/50 rounded-tr-sm'
                      : 'bg-[#14203D] text-slate-100 border border-slate-700/80 rounded-tl-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Reaction counts and actions row */}
                  <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleReaction(msg.id, 'thumbsUp')}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer active:scale-95 ${
                          msg.reactions.thumbsUp.includes(currentUserId)
                            ? 'bg-[#84CC16] text-slate-950 shadow-xs'
                            : 'bg-[#0D1527] text-slate-300 hover:text-white border border-slate-700'
                        }`}
                        title="Agree"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span className="tabular-nums">{msg.reactions.thumbsUp.length || 0}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleReaction(msg.id, 'lightbulb')}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer active:scale-95 ${
                          msg.reactions.lightbulb.includes(currentUserId)
                            ? 'bg-[#FF5B00] text-white shadow-xs'
                            : 'bg-[#0D1527] text-slate-300 hover:text-white border border-slate-700'
                        }`}
                        title="Valuable Advice"
                      >
                        <Lightbulb className="w-3 h-3" />
                        <span className="tabular-nums">{msg.reactions.lightbulb.length || 0}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-300">
                      <button
                        type="button"
                        onClick={() => {
                          playSound.tileTap();
                          setReplyingTo(msg);
                        }}
                        className="hover:text-[#84CC16] transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                        title="Reply to message"
                      >
                        <CornerDownRight className="w-3 h-3" />
                        <span className="hidden sm:inline">Reply</span>
                      </button>

                      {!isMe && (
                        <button
                          type="button"
                          onClick={() => {
                            playSound.tileTap();
                            setReportingMessage(msg);
                          }}
                          className="hover:text-[#FF5B00] transition-colors p-1 cursor-pointer"
                          title="Report message"
                        >
                          <Flag className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Compose Box (Bottom Fixed Bar) */}
      <div className="bg-[#0D1527] border-t border-slate-800 p-3 shrink-0">
        {replyingTo && (
          <div className="mb-2 px-3 py-1.5 rounded-xl bg-[#14203D] border border-[#84CC16]/40 flex items-center justify-between text-xs text-slate-200">
            <div className="flex items-center gap-1.5 min-w-0">
              <CornerDownRight className="w-3.5 h-3.5 text-[#84CC16] shrink-0" />
              <span className="font-bold text-white">Replying to {replyingTo.senderName}:</span>
              <span className="truncate text-slate-400 italic text-[11px]">{replyingTo.text}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                playSound.tileTap();
                setReplyingTo(null);
              }}
              className="p-1 hover:text-white rounded text-slate-400 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {inputWarning && (
          <div className="mb-2 px-3 py-2 rounded-xl bg-[#FF5B00]/15 border border-[#FF5B00]/50 flex items-center gap-2 text-xs text-orange-200">
            <AlertTriangle className="w-4 h-4 text-[#FF5B00] shrink-0" />
            <span>{inputWarning}</span>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={e => {
                setInputText(e.target.value);
                if (inputWarning) setInputWarning(null);
              }}
              placeholder={`Contribute to #${currentChannel?.title || 'Lounge'} (Max 500 characters)...`}
              rows={2}
              maxLength={500}
              className="w-full bg-[#14203D] text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-2xl border-2 border-slate-700 focus:outline-none focus:border-[#84CC16] resize-none placeholder-slate-400"
            />
            <div className="absolute right-3 bottom-2 text-[10px] font-mono text-slate-400">
              {inputText.length}/500
            </div>
          </div>

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3.5 rounded-2xl bg-[#FF5B00] hover:bg-[#e05000] disabled:opacity-40 text-white font-black transition-all shadow-lg shadow-[#FF5B00]/25 cursor-pointer shrink-0 active:scale-95"
            title="Share with Parents"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Report Modal */}
      {reportingMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101C34] border-2 border-[#FF5B00]/50 rounded-3xl max-w-sm w-full p-5 space-y-3.5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2 text-[#FF5B00] font-black text-sm">
                <Flag className="w-4 h-4" />
                <span>Report Content</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  playSound.tileTap();
                  setReportingMessage(null);
                }}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {reportSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#84CC16] mx-auto" />
                <p className="text-sm font-black text-white">Report Submitted</p>
                <p className="text-xs text-slate-300">
                  Thank you for helping maintain a supportive, safe forum.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-[#14203D] p-3 rounded-2xl border border-slate-800 text-xs text-slate-200 italic">
                  &quot;{reportingMessage.text.slice(0, 100)}...&quot;
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-200 block">
                    Reason for report:
                  </label>
                  {[
                    { id: 'inappropriate', label: 'Inappropriate or Disrespectful' },
                    { id: 'spam', label: 'Commercial Spam or Unsolicited Promotion' },
                    { id: 'bullying', label: 'Harassment or Conflict' }
                  ].map(item => (
                    <label
                      key={item.id}
                      onClick={() => playSound.tileTap()}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#14203D] hover:bg-[#19284C] border border-slate-700/80 cursor-pointer text-xs text-slate-100"
                    >
                      <input
                        type="radio"
                        name="parentReportReason"
                        checked={reportReason === item.id}
                        onChange={() => setReportReason(item.id as any)}
                        className="accent-[#84CC16]"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      playSound.tileTap();
                      setReportingMessage(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitReport}
                    className="flex-1 py-2.5 rounded-xl bg-[#FF5B00] hover:bg-[#e05000] text-white text-xs font-black shadow-md shadow-[#FF5B00]/25 cursor-pointer"
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
