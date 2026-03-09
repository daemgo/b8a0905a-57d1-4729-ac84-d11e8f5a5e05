"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  projectsMock,
  samplesMock,
  getStatusLabel,
  getStatusColor,
  projectStatusOptions,
  sampleStatusOptions,
} from "@/mock/projects";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;

  const project = projectsMock.find((p) => p.id === projectId);
  const projectSamples = samplesMock.filter((s) => s.projectId === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-xl font-medium mb-2">项目未找到</h2>
            <p className="text-muted-foreground mb-4">请检查项目ID是否正确</p>
            <Button asChild>
              <Link href="/projects">返回项目列表</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = project.samples > 0
    ? Math.round((project.completedSamples / project.samples) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/projects">
                <Button variant="ghost" size="sm">← 返回</Button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-medium">{project.projectName}</h1>
                  <Badge className={getStatusColor(project.status, projectStatusOptions)}>
                    {getStatusLabel(project.status, projectStatusOptions)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.projectNo}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">编辑</Button>
              <Button>导出报告</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Project Info Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                客户
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">{project.client}</div>
              <p className="text-sm text-muted-foreground">{project.clientContact}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                项目类型
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">{project.projectType}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                检测进度
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {project.completedSamples} / {project.samples} 样品完成
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                合同金额
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">¥{project.amount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                已收: ¥{project.paidAmount.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">基本信息</TabsTrigger>
            <TabsTrigger value="samples">
              样品列表 ({projectSamples.length})
            </TabsTrigger>
            <TabsTrigger value="timeline">进度跟踪</TabsTrigger>
            <TabsTrigger value="report">检测报告</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>项目详情</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      项目编号
                    </label>
                    <p className="mt-1">{project.projectNo}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      项目名称
                    </label>
                    <p className="mt-1">{project.projectName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      客户名称
                    </label>
                    <p className="mt-1">{project.client}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      联系人
                    </label>
                    <p className="mt-1">{project.clientContact}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      接收日期
                    </label>
                    <p className="mt-1">{project.receiveDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      预期完成日期
                    </label>
                    <p className="mt-1">{project.expectedDate}</p>
                  </div>
                  {project.actualDate && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        实际完成日期
                      </label>
                      <p className="mt-1">{project.actualDate}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      检测负责人
                    </label>
                    <p className="mt-1">{project.technician}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    项目描述
                  </label>
                  <p className="mt-1">{project.description || "无"}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Samples Tab */}
          <TabsContent value="samples" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>样品列表</CardTitle>
                  <Button size="sm">+ 添加样品</Button>
                </div>
              </CardHeader>
              <CardContent>
                {projectSamples.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="text-3xl mb-2">🧪</div>
                    <p>暂无样品</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {projectSamples.map((sample) => (
                      <div
                        key={sample.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{sample.sampleName}</span>
                            <Badge
                              className={getStatusColor(sample.status, sampleStatusOptions)}
                            >
                              {getStatusLabel(sample.status, sampleStatusOptions)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {sample.sampleNo} · {sample.sampleType}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            检测项目: {sample.testItems.join(", ")}
                          </p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>接收: {sample.receiveDate}</p>
                          <p>检测人: {sample.testingPerson || "未分配"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>进度跟踪</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { step: 1, name: "项目立项", status: "completed", date: project.receiveDate },
                    { step: 2, name: "样品接收", status: "completed", date: project.receiveDate },
                    { step: 3, name: "检测进行中", status: project.status === "testing" || project.status === "reporting" || project.status === "completed" ? "completed" : "pending", date: project.status === "testing" ? "进行中" : "" },
                    { step: 4, name: "报告编制", status: project.status === "reporting" || project.status === "completed" ? "completed" : "pending", date: project.status === "reporting" ? "进行中" : "" },
                    { step: 5, name: "报告签发", status: project.status === "completed" ? "completed" : "pending", date: project.actualDate },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            item.status === "completed"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {item.status === "completed" ? "✓" : item.step}
                        </div>
                        {item.step < 5 && (
                          <div
                            className={`w-0.5 h-12 my-1 ${
                              item.status === "completed" ? "bg-primary" : "bg-muted"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{item.name}</h4>
                          <span className="text-sm text-muted-foreground">
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Tab */}
          <TabsContent value="report" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>检测报告</CardTitle>
                  <Button>生成报告</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <div className="text-3xl mb-2">📄</div>
                  <p>报告生成功能开发中...</p>
                  <p className="text-sm mt-2">
                    {project.status === "completed"
                      ? "项目已完成，可以生成报告"
                      : "项目未完成，暂不能生成报告"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
