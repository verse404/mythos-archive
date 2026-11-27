import React from 'react';

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(): void {
    // Intentionally omit raw stack traces from client UI per security guidelines.
  }

  render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const isZh = typeof document !== 'undefined' && document.documentElement.lang === 'zh-CN';

    return (
      <div className="app-error-shell" role="alert">
        <div className="app-error-card">
          <span className="folio-kicker">
            {isZh ? '典籍页面状态异常' : 'ARCHIVAL VIEW INTERRUPTED'}
          </span>
          <h1 className="mt-sm">
            {isZh ? '页面渲染遇到意外中断' : 'Something interrupted this page'}
          </h1>
          <p className="text-muted mt-sm">
            {isZh
              ? '请点击下方按钮重新加载当前视图，或返回首页继续浏览。'
              : 'Reload the view below or return to the main exhibition hall to continue exploring.'}
          </p>
          <div className="row-wrap mt-md">
            <button
              type="button"
              className="btn-primary"
              onClick={() => window.location.reload()}
            >
              {isZh ? '重新加载页面' : 'Reload Page'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                window.location.href = import.meta.env.BASE_URL || '/';
              }}
            >
              {isZh ? '返回首页' : 'Return Home'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
