import { Gem } from "@/lib/validations/gems-Schema";

export const exportGemsToCSV = (
    gems: Gem[],
    filename: string = "gems-export.csv"
) => {
    if (gems.length === 0) {
        alert("No data to export");
        return;
    }

    // Define the headers based on the gem properties
    const headers = [
        "Stock ID",
        "Product Type",
        "Category",
        "Stone Type",
        "Color",
        "Shape",
        "Carat",
        "Origin",
        "Treatment",
        "Certificate",
        "Measurement",
        "Availability",
        "Created At",
        "Updated At",
    ];

    // Convert gems data to CSV rows
    const csvRows = gems.map((gem) => [
        gem.stockId || "",
        gem.productType || "",
        gem.category || "",
        gem.stoneType || "",
        gem.color || "",
        gem.shape || "",
        gem.carat?.toString() || "",
        gem.origin || "",
        gem.treatment || "",
        gem.certificate || "",
        gem.measurement || "",
        gem.availability ? "Available" : "Not Available",
        gem.createdAt ? new Date(gem.createdAt).toLocaleDateString() : "",
        gem.updatedAt ? new Date(gem.updatedAt).toLocaleDateString() : "",
    ]);

    // Combine headers and rows
    const allRows = [headers, ...csvRows];

    // Convert to CSV string
    const csvContent = allRows
        .map((row) =>
            row
                .map((field) => {
                    // Escape fields that contain commas, quotes, or newlines
                    if (
                        typeof field === "string" &&
                        (field.includes(",") ||
                            field.includes('"') ||
                            field.includes("\n"))
                    ) {
                        return `"${field.replace(/"/g, '""')}"`;
                    }
                    return field;
                })
                .join(",")
        )
        .join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
};
