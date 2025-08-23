
// File: components/dashboard/ActivityFeed.tsx
interface ActivityItem {
    id: string;
    text: string;
    time: string;
}
interface ActivityFeedProps {
    activities: ActivityItem[];
}
export const ActivityFeed = ({ activities }: ActivityFeedProps) => (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 shadow-lg backdrop-blur-sm h-full">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <ul className="space-y-4">
            {activities.map(activity => (
                <li key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 animate-pulse" />
                    <div>
                        <p className="text-sm text-gray-200">{activity.text}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);
