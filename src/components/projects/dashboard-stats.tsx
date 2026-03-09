"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DashboardStatsProps {
  stats: {
    totalProjects: number;
    pendingProjects: number;
    testingProjects: number;
    completedProjects: number;
    totalSamples: number;
    testingSamples: number;
    totalReports: number;
    issuedReports: number;
    totalClients: number;
    totalAmount: number;
    collectedAmount: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statsCards = [
    {
      title: "项目总数",
      value: stats.totalProjects,
      subtitle: `待启动 ${stats.pendingProjects} | 检测中 ${stats.testingProjects} | 已完成 ${stats.completedProjects}`,
      icon: "📋",
    },
    {
      title: "样品管理",
      value: stats.totalSamples,
      subtitle: `检测中 ${stats.testingSamples} 个`,
      icon: "🧪",
    },
    {
      title: "报告签发",
      value: `${stats.issuedReports}/${stats.totalReports}`,
      subtitle: "已签发/报告总数",
      icon: "📄",
    },
    {
      title: "客户数量",
      value: stats.totalClients,
      subtitle: "合作客户",
      icon: "👥",
    },
  ];

  const collectionRate = stats.totalAmount > 0
    ? Math.round((stats.collectedAmount / stats.totalAmount) * 100)
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <span className="text-2xl">{card.icon}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
