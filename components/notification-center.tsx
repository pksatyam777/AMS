'use client';

import { cn } from '@/lib/utils';

import { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Leave Approved',
    description: 'Your leave request for May 15-18 has been approved.',
    time: 'Just now',
    read: false
  },
  {
    id: '2',
    title: 'Document Verification',
    description: 'Your ID proof has been verified successfully.',
    time: '2 hours ago',
    read: false
  },
  {
    id: '3',
    title: 'Attendance Reminder',
    description: "Don't forget to check in today.",
    time: '5 hours ago',
    read: true
  },
  {
    id: '4',
    title: 'Team Meeting',
    description: 'Weekly team meeting scheduled for tomorrow at 10 AM.',
    time: 'Yesterday',
    read: true
  },
  {
    id: '5',
    title: 'Holiday Announcement',
    description: 'Office will remain closed on May 25 for Memorial Day.',
    time: '3 days ago',
    read: true
  }
];

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* <div
        className={`fixed inset-y-0 right-0 z-30 w-80 transform border-l bg-background transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4">
            {notifications.length === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center">
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={cn(
                      "cursor-pointer transition-colors hover:bg-muted/50",
                      !notification.read && "border-l-4 border-l-primary",
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">{notification.title}</CardTitle>
                      <CardDescription className="text-xs">{notification.time}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">{notification.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div> */}
    </>
  );
}
