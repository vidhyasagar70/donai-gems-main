"use client";

import { useParams } from "next/navigation";
import { ProductPage } from "@/components/product/ProductPage";
import Container from "@/components/ui/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.id as string;

    return (
        <div className="min-h-screen bg-gray-50">
            <Container>
                <div className="py-8">
                    {/* Breadcrumb */}
                    <Breadcrumb className="mb-6">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/gemstone">
                                    Products
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{productId}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Product Page */}
                    <ProductPage productId={productId} />
                </div>
            </Container>
        </div>
    );
}
