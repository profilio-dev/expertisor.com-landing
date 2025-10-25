"use client";

interface TrendingTag {
  name: string;
  posts: number;
}

interface SuggestedPerson {
  name: string;
  role: string;
  avatar: string;
}

interface RightSidebarProps {
  trendingTags: TrendingTag[];
  suggestedPeople: SuggestedPerson[];
}

export default function RightSidebar({ trendingTags, suggestedPeople }: RightSidebarProps) {
  return (
    <aside className="hidden xl:flex flex-col w-80 space-y-6">
      {/* Trending Tags */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Trending Tags</h3>
        <div className="space-y-3">
          {trendingTags.map((tag) => (
            <div key={tag.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">#{tag.name}</span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {tag.posts} posts
              </span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
          See all trends
        </button>
      </div>

      {/* Suggested People */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">People You May Know</h3>
        <div className="space-y-4">
          {suggestedPeople.map((person) => (
            <div key={person.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{person.name}</h4>
                  <p className="text-xs text-gray-500">{person.role}</p>
                </div>
              </div>
              <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            "Jane Smith commented on your post",
            "Mike Johnson liked your article",
            "You connected with Sarah Wilson"
          ].map((activity, index) => (
            <div key={index} className="text-sm text-gray-600 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              {activity}
            </div>
          ))}
        </div>
      </div>

      {/* Profile Analytics */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Profile Analytics</h4>
          <span className="text-xs text-gray-500">last 7 days</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-sm">
              <span className="font-semibold text-gray-900">5</span>
              <span className="text-green-500 text-xs">+5</span>
            </div>
            <span className="text-xs text-gray-500">Views</span>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900 text-sm">0</div>
            <span className="text-xs text-gray-500">Clicks</span>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900 text-sm">0</div>
            <span className="text-xs text-gray-500">Followers</span>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-lg p-3 mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>17</span>
            <span>18</span>
            <span>19</span>
            <span>20</span>
            <span>21</span>
            <span>22</span>
            <span>23</span>
          </div>
          <div className="h-20 bg-gradient-to-t from-blue-50 to-white rounded border border-gray-100 relative">
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
            <div className="absolute bottom-0 left-1/4 w-0.5 h-3/4 bg-blue-500"></div>
            <div className="absolute bottom-0 left-1/2 w-0.5 h-1/2 bg-blue-500"></div>
            <div className="absolute bottom-0 left-3/4 w-0.5 h-1/4 bg-blue-500"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>6</span>
          </div>
        </div>

        <button className="w-full bg-gray-900 hover:bg-black text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
          <span>Analytics Dashboard</span>
        </button>
      </div>
    </aside>
  );
}