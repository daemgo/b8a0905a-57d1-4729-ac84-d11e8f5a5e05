"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProjectTable } from "@/components/projects/project-table";
import { DashboardStats } from "@/components/projects/dashboard-stats";
import {
  projectsMock,
  getDashboardStats,
  projectStatusOptions,
  samplesMock,
  reportsMock,
  clientsMock,
} from "@/mock/projects";
import type { Project } from "@/types/project";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const stats = getDashboardStats();

  // 过滤项目
  const filteredProjects = projectsMock.filter((project) => {
    const matchesSearch =
      searchQuery === "" ||
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">← 返回</Button>
              </Link>
              <div>
                <h1 className="text-2xl font-serif font-medium">
                  君安检测业务项目管理系统
                </h1>
                <p className="text-sm text-muted-foreground">
                  检测业务全流程数字化管理平台
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">浙江君安检测技术有限公司</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Dashboard Stats */}
        <DashboardStats stats={stats} />

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="projects">项目管理</TabsTrigger>
            <TabsTrigger value="samples">样品管理</TabsTrigger>
            <TabsTrigger value="reports">报告管理</TabsTrigger>
            <TabsTrigger value="clients">客户管理</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>项目列表</CardTitle>
                    <CardDescription>
                      管理所有检测项目，跟踪项目进度
                    </CardDescription>
                  </div>
                  <Button>+ 新建项目</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    placeholder="搜索项目名称、编号、客户..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="sm:max-w-xs"
                  />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="sm:max-w-[180px]">
                      <SelectValue placeholder="筛选状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部状态</SelectItem>
                      {projectStatusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex-1" />
                  <Badge variant="secondary" className="h-10 px-4">
                    显示 {filteredProjects.length} / {projectsMock.length} 个项目
                  </Badge>
                </div>

                <Separator />

                {/* Table */}
                <ProjectTable projects={filteredProjects} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Samples Tab */}
          <TabsContent value="samples" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>样品列表</CardTitle>
                    <CardDescription>
                      管理检测样品，跟踪样品流转状态
                    </CardDescription>
                  </div>
                  <Button>+ 样品登记</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <div className="text-4xl mb-4">🧪</div>
                  <p>样品管理模块开发中...</p>
                  <p className="text-sm mt-2">当前样品总数: {samplesMock.length}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>报告列表</CardTitle>
                    <CardDescription>
                      管理检测报告，跟踪报告签发流程
                    </CardDescription>
                  </div>
                  <Button>生成报告</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <div className="text-4xl mb-4">📄</div>
                  <p>报告管理模块开发中...</p>
                  <p className="text-sm mt-2">当前报告总数: {reportsMock.length}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>客户列表</CardTitle>
                    <CardDescription>
                      管理客户信息，跟踪客户合作记录
                    </CardDescription>
                  </div>
                  <Button>+ 新建客户</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <div className="text-4xl mb-4">👥</div>
                  <p>客户管理模块开发中...</p>
                  <p className="text-sm mt-2">当前客户总数: {clientsMock.length}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
            <CardDescription>常用功能快捷入口</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <span className="text-2xl">📋</span>
                <span>新建项目</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <span className="text-2xl">🧪</span>
                <span>样品登记</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <span className="text-2xl">📄</span>
                <span>生成报告</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <span className="text-2xl">📊</span>
                <span>数据统计</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
