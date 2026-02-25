import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 *  Hook To Fetch All Workflows From Suspense
 */
export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions())
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
                trpc.workflows.getMany.queryOptions()
            )
        },
        onError: (error) => {
            toast.error(`Failed To Create Workflow : ${error.message}`)
        }
    }))
}