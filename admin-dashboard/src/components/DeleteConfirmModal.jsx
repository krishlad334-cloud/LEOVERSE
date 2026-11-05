import { Trash2, AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  product = null,
}) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-red-100 text-red-600 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2C4152]">
              Delete Fashion Product?
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Are you sure you want to delete <span className="font-semibold text-gray-800">"{product.name}"</span>?
              This action permanently removes the item from Firestore and unpublishes it from the customer storefront.
            </p>
          </div>
        </div>

        {/* Product preview card */}
        <div className="flex items-center gap-3 p-3 my-4 rounded-lg bg-[#F5F5F5] border border-gray-200">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&q=80'}
            alt={product.name}
            className="w-12 h-16 object-cover rounded border border-gray-300"
          />
          <div className="text-xs">
            <span className="font-bold text-[#2C4152] block line-clamp-1">{product.name}</span>
            <span className="text-gray-500">{product.brand} • {product.department}</span>
            <span className="font-bold text-[#D5A249] block mt-0.5">
              ₹{product.salePrice || product.price}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 active:scale-95 rounded-lg transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(product.id);
              onClose();
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Yes, Delete from Catalog</span>
          </button>
        </div>
      </div>
    </div>
  );
}
