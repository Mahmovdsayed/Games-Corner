import React from "react";
import { Button } from "@nextui-org/react";
import { MutatingDots } from "react-loader-spinner";

const LoadingScreen = () => {
    return (
        <div className="flex items-center justify-center  h-screen">
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#0070f0"
                secondaryColor="#0070f0"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default LoadingScreen;