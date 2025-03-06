import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

class ErrorBoundary extends Component<
    Props,
    { error: null | Error; info: unknown }
> {
    constructor(props:Props){
        super(props);
        this.state = {
            error: null,
            info: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ error, info:errorInfo });
    }

    render () {
        const { error, info } = this.state;
        if (error){
            if(this.props.fallback){
                return this.props.fallback;
            }
            return (
                <div>
                    <h1>¡Oops! Algo salió mal</h1>
                    <div>
                        <code>{error.message}</code>
                    </div>
                    <div>
                        <code>{JSON.stringify(info)}</code>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;