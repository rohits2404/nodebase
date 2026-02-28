import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";

/**
 *  Hook To Fetch All Workflows From Suspense
 */
export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    const [params] = useWorkflowsParams();
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params))
}

/**
 * Hook To Create a New Workflow
 */
export const useCreateWorkflow = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow "${data.name}" Created`);
            queryClient.invalidateQueries(
                trpc.workflows.getMany.queryOptions({})
            )
        },
        onError: (error) => {
            toast.error(`Failed To Create Workflow : ${error.message}`)
        }
    }))
}

/**
 * Hook To Remove a Workflow
 */

export const useRemoveWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    return useMutation(trpc.workflows.remove.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow "${data.name}" Removed`)
            queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
            queryClient.invalidateQueries(trpc.workflows.getOne.queryFilter({ id: data.id }))
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }))
}

/**
 * Hook To Get a Single Workflow using Suspense
 */
export const useSuspenseWorkflow = (id: string) => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflows.getOne.queryOptions({ id }))
}

/**
 * Hook To Update a Workflow Name
 */
export const useUpdateWorkflowName = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    return useMutation(trpc.workflows.updateName.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow "${data.name}" Updated`);
            queryClient.invalidateQueries(
                trpc.workflows.getMany.queryOptions({})
            )
            queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions({ id: data.id }))
        },
        onError: (error) => {
            toast.error(`Failed To Create Workflow : ${error.message}`)
        }
    }))
}

/**
 * Hook To Update a Workflow
 */
export const useUpdateWorkflow = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    return useMutation(trpc.workflows.update.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow "${data.name}" Saved`);
            queryClient.invalidateQueries(
                trpc.workflows.getMany.queryOptions({})
            )
            queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions({ id: data.id }))
        },
        onError: (error) => {
            toast.error(`Failed To Create Workflow : ${error.message}`)
        }
    }))
}

/**
 * Hook To Execute Workflow
 */
export const useExecuteWorkflow = () => {
    const trpc = useTRPC();
    return useMutation(
        trpc.workflows.execute.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}" Executed`)
            },
            onError: (error) => {
                toast.error(`Failed To Execute Workflow: ${error.message}`)
            }
        })
    )
}