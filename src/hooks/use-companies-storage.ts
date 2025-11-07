import type { Company } from "@/types/company";
import  dummyData  from "@/../dummyData.json";
import { useEffect, useState } from "react";


export function useCompaniesStorage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const storedCompanies = localStorage.getItem("companies");
        if (storedCompanies) {
            setCompanies(JSON.parse(storedCompanies));
        } else {
            setCompanies(dummyData as Company[]);
            localStorage.setItem("companies", JSON.stringify(dummyData));
        }
        setIsLoading(false);
    }, []);

    return {
        companies,
        setCompanies,
        isLoading,
    };
}
