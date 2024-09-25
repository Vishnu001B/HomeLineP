import React from "react";

// Helper function to check if the array is not empty and doesn't contain only empty strings
const isValidArray = (arr) => Array.isArray(arr) && arr.some(item => item.trim() !== "");

export const ProductInfo = ({ product }) => {
    // Ensure product is defined
    if (!product) {
        return <p className="text-gray-600">Product information not available.</p>;
    }

    // Normalize product properties
    const colors = Array.isArray(product.color) ? product.color : [product.color].filter(Boolean);
    const sizes = Array.isArray(product.size) ? product.size : []; // Ensure sizes is an array

    return (
        <div className="mt-4 space-y-4">
            <details className="border p-4 rounded-sm border-gray-300 pt-2">
                <summary className="font-semibold">Product Details</summary>
                <ul className="list-disc pl-5">
                    {product.descriptions && (
                        <li className="mt-2 text-gray-600">{product.descriptions}</li>
                    )}
                    
                    {product.skuCode && (
                        <li className="text-sm text-gray-600 my-2 font-semibold">
                            Product Code:{" "}
                            <span className="font-normal">{product.skuCode}</span>
                        </li>
                    )}

                    {/* Render Color only if it's a valid non-empty array */}
                    {isValidArray(colors) && (
                        <li className="mt-2 text-gray-600">
                            Color: {colors.join(", ")}
                        </li>
                    )}

                    {/* Render Size only if it's a valid non-empty array */}
                    {isValidArray(sizes) && (
                        <li className="mt-2 text-gray-600">
                            Size: {sizes.join(", ")}
                        </li>
                    )}

                    {product.material && (
                        <li className="mt-2 text-gray-600">Material: {product.material}</li>
                    )}

                    {product.endUse && (
                        <li className="mt-2 text-gray-600">
                            End Use: {product.endUse}
                        </li>
                    )}

                    {product.additionalInfo1 || product.additionalInfo2 ? (
                        <li className="mt-2 text-gray-600">
                            Additional Info: {product.additionalInfo1 || ''}{product.additionalInfo2 ? `, ${product.additionalInfo2}` : ''}
                        </li>
                    ) : null}

                    {product.countryOfOrigin && (
                        <li className="mt-2 text-gray-600">Origin: {product.countryOfOrigin}</li>
                    )}
                </ul>
            </details>

            <details className="border p-4 rounded-sm border-gray-300 pt-2">
                <summary className="font-semibold">Material & Care</summary>
                <p className="mt-2 text-gray-600">
                    {product.material ||
                        "Cotton, Polyester, Spandex, Silk, Synthetic Cotton, Nylon, Acrylic, Rayon, Lace, etc."}
                </p>
            </details>

            
        </div>
    );
};
