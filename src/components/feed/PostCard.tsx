"use client";
import { useState } from "react";
import { Heart, MessageCircle, Share, Bookmark, Eye, MoreHorizontal } from "lucide-react";
import ActionButton from "./ActionButton";

interface Post {
  id: number;
  name: string;
  role: string;
  avatar: string;
  time: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          <div>
            <h3 className="font-semibold text-gray-900">{post.name}</h3>
            <p className="text-sm text-gray-500">{post.role}</p>
            <span className="text-xs text-gray-400">{post.time}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed">{post.content}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium hover:bg-blue-100 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-4">
          <span>{likes} likes</span>
          <span>{post.comments} comments</span>
          <span>{post.shares} shares</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye size={16} />
          <span>{post.views} views</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex border-t border-gray-100 pt-3">
        <ActionButton
          icon={<Heart size={18} className={isLiked ? "fill-red-500 text-red-500" : ""} />}
          label="Like"
          onClick={handleLike}
          active={isLiked}
        />
        <ActionButton
          icon={<MessageCircle size={18} />}
          label="Comment"
        />
        <ActionButton
          icon={<Share size={18} />}
          label="Share"
        />
        <div className="flex-1"></div>
        <ActionButton
          icon={<Bookmark size={18} className={isBookmarked ? "fill-blue-500 text-blue-500" : ""} />}
          label="Save"
          onClick={handleBookmark}
          active={isBookmarked}
        />
      </div>
    </div>
  );
}