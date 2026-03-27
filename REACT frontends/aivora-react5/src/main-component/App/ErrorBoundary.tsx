import React, { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("Uncaught error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary text-center p-5">
                    <h2>Something went wrong 😢</h2>
                    <p>Try refreshing the page or go back to home.</p>
                    <Link className="thm-btn agency-btn" to="/">
                        <span className="text">Back to Home</span>
                        <span className="arrow">
                            <span className="arrow-icon">
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="5.06592"
                                        y="19.9785"
                                        width="20.5712"
                                        height="2.61221"
                                        transform="rotate(-40.2798 5.06592 19.9785)"
                                        fill="white"
                                    />
                                    <rect
                                        x="7.97095"
                                        y="7.24463"
                                        width="2.61221"
                                        height="2.61221"
                                        transform="rotate(-40.2798 7.97095 7.24463)"
                                        fill="white"
                                    />
                                    <rect
                                        x="11.6523"
                                        y="7.54834"
                                        width="2.61221"
                                        height="2.61221"
                                        transform="rotate(-40.2798 11.6523 7.54834)"
                                        fill="white"
                                    />
                                    <rect
                                        x="15.334"
                                        y="7.85205"
                                        width="2.61221"
                                        height="2.61221"
                                        transform="rotate(-40.2798 15.334 7.85205)"
                                        fill="white"
                                    />
                                    <rect
                                        x="18.7119"
                                        y="11.8374"
                                        width="2.61221"
                                        height="2.61221"
                                        transform="rotate(-40.2798 18.7119 11.8374)"
                                        fill="white"
                                    />
                                    <rect
                                        x="18.4084"
                                        y="15.52"
                                        width="2.61221"
                                        height="2.61221"
                                        transform="rotate(-40.2798 18.4084 15.52)"
                                        fill="white"
                                    />
                                    <rect
                                        x="18.104"
                                        y="19.2012"
                                        width="2.61221"
                                        height="2.61221"
                                        transform="rotate(-40.2798 18.104 19.2012)"
                                        fill="white"
                                    />
                                </svg>
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="5.06592"
                                        y="19.9785"
                                        width="20.5712"
                                        height="2.61221"
                                        transform="rotate(-40.2798 5.06592 19.9785)"
                                        fill="white"
                                    />
                                    <rect
                                        x="7.97095"
                                        y="7.24463"
                                        width="2.61221"
                                        height="2.61221"
                                        transform="rotate(-40.2798 7.97095 7.24463)"
                                        fill="white"
                                    />
                                    <rect
                                        x="11.6523"
                                        y="7.54834"
                                        width="2.61221"
                                        height="2.61221"
                                        transform="rotate(-40.2798 11.6523 7.54834)"
                                        fill="white"
                                    />
                                    <rect
                                        x="15.334"
                                        y="7.85205"
                                        width="2.61221"
                                        height="2.61221"
                                        transform="rotate(-40.2798 15.334 7.85205)"
                                        fill="white"
                                    />
                                    <rect
                                        x="18.7119"
                                        y="11.8374"
                                        width="2.61221"
                                        height="2.61221"
                                        transform="rotate(-40.2798 18.7119 11.8374)"
                                        fill="white"
                                    />
                                    <rect
                                        x="18.4084"
                                        y="15.52"
                                        width="2.61221"
                                        height="2.61221"
                                        transform="rotate(-40.2798 18.4084 15.52)"
                                        fill="white"
                                    />
                                    <rect
                                        x="18.104"
                                        y="19.2012"
                                        width="2.61221"
                                        height="2.61221"
                                        transform="rotate(-40.2798 18.104 19.2012)"
                                        fill="white"
                                    />
                                </svg>
                            </span>
                        </span>
                    </Link>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
