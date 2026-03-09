"use client";

import { Project } from "@/types/project";
import { getStatusLabel, getStatusColor, projectStatusOptions } from "@/mock/projects";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProjectTableProps {
  projects: Project[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>项目编号</TableHead>
            <TableHead>项目名称</TableHead>
            <TableHead>客户</TableHead>
            <TableHead>项目类型</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>进度</TableHead>
            <TableHead>接收日期</TableHead>
            <TableHead>预期完成</TableHead>
            <TableHead>合同金额</TableHead>
            <TableHead>负责人</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => {
            const progress = project.samples > 0
              ? Math.round((project.completedSamples / project.samples) * 100)
              : 0;

            return (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.projectNo}</TableCell>
                <TableCell className="max-w-xs truncate" title={project.projectName}>
                  {project.projectName}
                </TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {project.projectType}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(project.status, projectStatusOptions)}>
                    {getStatusLabel(project.status, projectStatusOptions)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{progress}%</span>
                  </div>
                </TableCell>
                <TableCell>{project.receiveDate}</TableCell>
                <TableCell>{project.expectedDate}</TableCell>
                <TableCell>¥{project.amount.toLocaleString()}</TableCell>
                <TableCell>{project.technician}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/projects/${project.id}`}>查看</Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
