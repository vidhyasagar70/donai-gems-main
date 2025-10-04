"use client";

import { useCallback, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { gemsColumns } from "@/components/data-table/gems-columns";
import { useGems } from "@/hooks/useGems";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DownloadIcon, FileTextIcon, PlusIcon, RefreshCw } from "lucide-react";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/ui/CustomButton";
import { AdminGuard } from "@/components/guards/AdminGuard";
import { AddGemModal } from "@/components/modals/AddGemModal";
import { exportGemsToCSV } from "@/lib/utils/csvExport";

function AdminPageContent() {
    const {
        gems,
        loading,
        error,
        totalCount,
        pageCount,
        refetch,
        updateTable,
        paginationMeta,
    } = useGems();

    const [isAddGemModalOpen, setIsAddGemModalOpen] = useState(false);

    const handleStateChange = useCallback(
        (state: {
            pagination: { pageIndex: number; pageSize: number };
            sorting: Array<{ id: string; desc: boolean }>;
            columnFilters: Array<{ id: string; value: any }>;
        }) => {
            console.log("📊 Table state changed:", state);
            updateTable(state);
        },
        [updateTable]
    );

    const handleRefresh = useCallback(() => {
        console.log("🔄 Manual refresh triggered");
        refetch();
    }, [refetch]);

    const handleAddGemSuccess = useCallback(() => {
        console.log("✅ Gem added successfully, refreshing data");
        refetch();
    }, [refetch]);

    const handleExport = useCallback(() => {
        if (gems.length === 0) {
            alert("No data to export. Please wait for data to load.");
            return;
        }

        // Generate filename with current timestamp
        const timestamp = new Date()
            .toISOString()
            .slice(0, 19)
            .replace(/:/g, "-");
        const filename = `gems-export-${timestamp}.csv`;

        console.log(`📊 Exporting ${gems.length} gems to CSV`);
        exportGemsToCSV(gems, filename);
    }, [gems]);

    return (
        <Container>
            <div className="flex items-center justify-start gap-2 my-5">
                <CustomButton
                    onClick={handleExport}
                    disabled={loading || gems.length === 0}
                    variant="secondary"
                    className="rounded-md text-neutral-500 border shadow-none hover:bg-primary/80 hover:border-none hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    icon={<DownloadIcon size={15} />}
                >
                    Export ({gems.length} records)
                </CustomButton>
                {/* <CustomButton
                    variant="secondary"
                    className="rounded-md border text-neutral-500 shadow-none hover:bg-primary/80 hover:border-none hover:text-white"
                    icon={<FileTextIcon size={15} />}
                >
                    <span>Import&nbsp;Excel</span>
                </CustomButton> */}
                <CustomButton
                    onClick={handleRefresh}
                    disabled={loading}
                    variant="secondary"
                    className="rounded-md border text-neutral-500 shadow-none hover:bg-primary/80 hover:border-none hover:text-white"
                >
                    <RefreshCw
                        className={`mr-2 h-4 w-4 ${
                            loading ? "animate-spin" : ""
                        }`}
                    />
                    Refresh
                </CustomButton>
                <CustomButton
                    onClick={() => setIsAddGemModalOpen(true)}
                    className="bg-primary rounded-md shadow-none"
                    icon={<PlusIcon size={15} />}
                >
                    <span>Add&nbsp;Gems</span>
                </CustomButton>
            </div>

            {/* ...existing code... */}
            <div className="flex items-center justify-start gap-5 my-10">
                <div className="w-80 h-28 border border-primary rounded-xl flex flex-col justify-center items-start gap-2 px-7">
                    <h1 className="text-neutral-500 text-base">
                        Total Diamonds (All Inventory)
                    </h1>
                    <h1 className="text-2xl font-semibold text-primary">
                        {loading ? "..." : totalCount.toLocaleString()}
                    </h1>
                </div>
                <div className="w-80 h-28 border border-primary rounded-xl flex flex-col justify-center items-start gap-2 px-7">
                    <h1 className="text-neutral-500 text-base">Available</h1>
                    <h1 className="text-2xl font-semibold text-primary">
                        {loading
                            ? "..."
                            : gems.filter((g) => g.availability).length}
                    </h1>
                </div>
                <div className="w-80 h-28 border border-primary rounded-xl flex flex-col justify-center items-start gap-2 px-7">
                    <h1 className="text-neutral-500 text-base">Total Size</h1>
                    <h1 className="text-2xl font-semibold text-primary">
                        {loading
                            ? "..."
                            : gems
                                  .reduce((sum, g) => sum + (g.carat || 0), 0)
                                  .toFixed(2)}{" "}
                        ct
                    </h1>
                </div>
            </div>
            <div className="py-10">
                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertDescription>
                            Error loading gems: {error}
                            <Button
                                onClick={handleRefresh}
                                variant="outline"
                                size="sm"
                                className="ml-4"
                            >
                                Retry
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}

                <DataTable
                    columns={gemsColumns}
                    data={gems}
                    loading={loading}
                    onStateChange={handleStateChange}
                    paginationMeta={paginationMeta}
                    pageCount={pageCount}
                />
            </div>

            {/* Add Gem Modal */}
            <AddGemModal
                isOpen={isAddGemModalOpen}
                onClose={() => setIsAddGemModalOpen(false)}
                onSuccess={() => {
                    alert("Gem added successfully!");
                    handleAddGemSuccess();
                }}
            />
        </Container>
    );
}

export default function AdminPage() {
    return (
        <AdminGuard>
            <AdminPageContent />
        </AdminGuard>
    );
}
