import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

type Input = inferInput<typeof trpc.workflows.getMany>;

/**
 *  Prefetch All Workflows
 */
export const prefetchWorkflows = (params: Input) => {
    return prefetch(trpc.workflows.getMany.queryOptions(params))
}

/**
 * Prefetch a Single Workflow
 */
export const prefetchSingleWorkflow = (id: string) => {
    return prefetch(trpc.workflows.getOne.queryOptions({ id }))
}