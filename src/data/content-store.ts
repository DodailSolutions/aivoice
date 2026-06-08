"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const contentFilePath = path.join(process.cwd(), "src/data/content.json");
const leadsFilePath = path.join(process.cwd(), "src/data/leads.json");

// Helper to safely read JSON files
function readJsonFile(filePath: string): any {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error);
    return null;
  }
}

// Helper to safely write JSON files
function writeJsonFile(filePath: string, data: any): boolean {
  try {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(`Error writing file at ${filePath}:`, error);
    return false;
  }
}

/* ==========================================
   Content Management System (CMS) Actions
   ========================================== */

export async function getContent(): Promise<any> {
  const data = readJsonFile(contentFilePath);
  if (!data) {
    throw new Error("Failed to load page content.");
  }
  return data;
}

export async function updateContent(pageKey: string, sectionKey: string, updatedData: any): Promise<{ success: boolean; error?: string }> {
  try {
    const content = readJsonFile(contentFilePath);
    if (!content) {
      return { success: false, error: "Content database not initialized." };
    }

    if (!content[pageKey]) {
      content[pageKey] = {};
    }

    content[pageKey][sectionKey] = updatedData;
    writeJsonFile(contentFilePath, content);

    // Revalidate paths to update the UI on next reload
    revalidatePath("/");
    revalidatePath("/product");
    revalidatePath("/pricing");
    revalidatePath("/integrations");
    revalidatePath("/menus");
    revalidatePath("/faq");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update content." };
  }
}

/* ==========================================
   Customer Relationship Management (CRM) Actions
   ========================================== */

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  restaurantName: string;
  posSystem: string;
  status: "new" | "contacted" | "qualified" | "demo_scheduled" | "won" | "lost";
  notes: string;
  interestLevel: "low" | "medium" | "high";
  createdAt: string;
}

export async function getLeads(): Promise<Lead[]> {
  const data = readJsonFile(leadsFilePath);
  return (data as Lead[]) || [];
}

export async function createLead(leadData: Omit<Lead, "id" | "createdAt">): Promise<{ success: boolean; lead?: Lead; error?: string }> {
  try {
    const leads = await getLeads();
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    leads.unshift(newLead); // Add to the top of the list
    writeJsonFile(leadsFilePath, leads);

    return { success: true, lead: newLead };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create lead." };
  }
}

export async function updateLead(updatedLead: Lead): Promise<{ success: boolean; error?: string }> {
  try {
    const leads = await getLeads();
    const index = leads.findIndex((l) => l.id === updatedLead.id);

    if (index === -1) {
      return { success: false, error: "Lead not found." };
    }

    leads[index] = updatedLead;
    writeJsonFile(leadsFilePath, leads);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update lead." };
  }
}

export async function deleteLead(leadId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const leads = await getLeads();
    const filteredLeads = leads.filter((l) => l.id !== leadId);

    if (leads.length === filteredLeads.length) {
      return { success: false, error: "Lead not found." };
    }

    writeJsonFile(leadsFilePath, filteredLeads);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete lead." };
  }
}
