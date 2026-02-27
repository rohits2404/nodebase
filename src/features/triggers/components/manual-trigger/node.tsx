import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointerIcon } from "lucide-react";
import { ManualTriggerDialog } from "./dialog";

export const ManualTriggerNode = memo((props: NodeProps) => {

    const [dialogOpen,setDialogOpen] = useState(false);

    const handleOpenSettings = () => setDialogOpen(true)

    const nodeStatus = "initial";

    return (
        <>
            <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
            <BaseTriggerNode
            {...props}
            icon={MousePointerIcon}
            name="When Clicking 'Execute Workflow'"
            onSettings={handleOpenSettings}
            onDoubleClick={handleOpenSettings}
            status={nodeStatus}
            />
        </>
    )
})