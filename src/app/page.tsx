'use client'
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubIcon, MailIcon } from "lucide-react";
import Header from "@/components/layout/header";
import CompanyStats from "@/components/companies/company-stats";
import type { Company } from "@/types/company";
import dummyData from "@/../dummyData.json"

export default function HomePage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedCompanies = localStorage.getItem("companies")
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies))

    } else {
      setCompanies(dummyData as Company[])

    }
    setIsLoading(false)
  }, [])

  if (loading) {
    return <div>loading..</div>
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Header viewMode="grid" onViewChange={() => { }} onAdd={() => { }} onSearchChange={() => { }} onSortChange={() => { }} searchQuery="" sortBy="" />
        <CompanyStats companies={companies} />
      </div>
    </main>
  );
}
