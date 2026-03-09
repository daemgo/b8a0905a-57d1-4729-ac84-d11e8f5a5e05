// 项目状态类型
export type ProjectStatus = "pending" | "sampling" | "testing" | "reporting" | "completed" | "abnormal";

// 样品状态类型
export type SampleStatus = "received" | "testing" | "completed" | "abnormal";

// 报告状态类型
export type ReportStatus = "draft" | "reviewing" | "approved" | "issued";

// 项目接口
export interface Project {
  id: string;
  projectNo: string;
  projectName: string;
  client: string;
  clientContact: string;
  projectType: string;
  status: ProjectStatus;
  receiveDate: string;
  expectedDate: string;
  actualDate?: string;
  samples: number;
  completedSamples: number;
  amount: number;
  paidAmount: number;
  technician: string;
  description?: string;
  createdAt: string;
}

// 样品接口
export interface Sample {
  id: string;
  sampleNo: string;
  projectId: string;
  projectName: string;
  sampleName: string;
  sampleType: string;
  client: string;
  status: SampleStatus;
  receiveDate: string;
  receivePerson: string;
  testItems: string[];
  testingPerson?: string;
  testStartDate?: string;
  testEndDate?: string;
  remark?: string;
}

// 报告接口
export interface Report {
  id: string;
  reportNo: string;
  projectId: string;
  projectName: string;
  client: string;
  sampleCount: number;
  status: ReportStatus;
  creator: string;
  createDate: string;
  reviewer?: string;
  reviewDate?: string;
  approver?: string;
  approveDate?: string;
  issueDate?: string;
  conclusion: string;
}

// 客户接口
export interface Client {
  id: string;
  clientNo: string;
  clientName: string;
  contact: string;
  phone: string;
  email?: string;
  address: string;
  industry: string;
  projectCount: number;
  lastProjectDate?: string;
  createdAt: string;
}

// 人员资质接口
export interface Personnel {
  id: string;
  name: string;
  employeeNo: string;
  department: string;
  position: string;
  qualifications: Qualification[];
  phone: string;
  email?: string;
  status: "active" | "inactive";
}

// 资质接口
export interface Qualification {
  id: string;
  name: string;
  certificateNo: string;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
  status: "valid" | "expiring" | "expired";
}

// 设备接口
export interface Equipment {
  id: string;
  equipmentNo: string;
  equipmentName: string;
  model: string;
  manufacturer: string;
  purchaseDate: string;
  lastCalibrationDate: string;
  nextCalibrationDate: string;
  calibrationStatus: "valid" | "expiring" | "expired";
  location: string;
  responsiblePerson: string;
  status: "active" | "maintenance" | "inactive";
}
