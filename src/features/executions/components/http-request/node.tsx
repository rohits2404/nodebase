"use client"

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { GlobeIcon } from "lucide-react";
import { HttpRequestDialog } from "./dialog";

type HttpRequestNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
    [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
    
    const [openDialog, setDialogOpen] = useState(false);

    const { setNodes } = useReactFlow();

    const nodeData = props.data;

    const handleOpenSettings = () => setDialogOpen(true);

    const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : "Not Configured";

    const nodeStatus = "initial";

    const handleSubmit = (values: {
        endpoint: string;
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        body?: string;
    }) => {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id === props.id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        endpoint: values.endpoint,
                        method: values.method,
                        body: values.body,
                    },
                };
            }
            return node;
        }));
    };

    return (
        <>
            <HttpRequestDialog
            open={openDialog}
            onOpenChange={setDialogOpen}
            onSubmit={handleSubmit}
            defaultEndpoint={nodeData.endpoint}
            defaultMethod={nodeData.method}
            defaultBody={nodeData.body}
            />

            <BaseExecutionNode
            {...props}
            id={props.id}
            icon={GlobeIcon}
            name="HTTP Request"
            description={description}
            onSettings={handleOpenSettings}
            onDoubleClick={handleOpenSettings}
            status={nodeStatus}
            />
        </>
    );
});

HttpRequestNode.displayName = "HttpRequestNode";