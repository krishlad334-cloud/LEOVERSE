import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('LEOVERSE Error Boundary caught:', error, errorInfo);
  }

  handleReload = () => {
    try {
      localStorage.removeItem('leoverse_cart');
      localStorage.removeItem('leoverse_wishlist');
      localStorage.removeItem('leoverse_coupon');
    } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F7F5F0] text-[#242321] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md bg-[#FAF9F6] border border-[#D8D2C8] p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-[#EAE5DC] rounded-full flex items-center justify-center mx-auto text-[#242321]">
              <AlertCircle className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h1 className="text-xl font-medium tracking-tight uppercase">
              LEOVERSE Atelier
            </h1>
            <p className="text-xs text-[#77746E] leading-relaxed">
              We encountered a client-side display issue while rendering the garment gallery.
            </p>
            {this.state.error?.message && (
              <div className="p-3 bg-[#EAE5DC]/60 text-[11px] text-[#242321] font-mono text-left overflow-x-auto">
                {this.state.error.message}
              </div>
            )}
            <div className="pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#252522] text-[#FAF9F6] text-xs uppercase tracking-wider font-medium hover:bg-[#383733] transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset & Reload Store</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
