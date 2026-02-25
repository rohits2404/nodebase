import { generateSlug } from "random-word-slugs";
import prisma from "@/lib/db";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const workflowsRouter = createTRPCRouter({
    create: premiumProcedure.mutation(({ ctx }) => {
        return prisma.workflow.create({
            data: {
                name: generateSlug(3),
                userId: ctx.auth.user.id,
            },
        });
    }),

    remove: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        const workflow = await prisma.workflow.findUnique({
            where: { id: input.id },
        });

        if (!workflow || workflow.userId !== ctx.auth.user.id) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Workflow not found",
            });
        }

        return prisma.workflow.delete({
            where: { id: input.id },
        });
    }),

    updateName: protectedProcedure.input(z.object({
        id: z.string(),
        name: z.string().min(1),
    })).mutation(async ({ ctx, input }) => {
        const workflow = await prisma.workflow.findUnique({
            where: { id: input.id },
        });

        if (!workflow || workflow.userId !== ctx.auth.user.id) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Workflow not found",
            });
        }

        return prisma.workflow.update({
            where: { id: input.id },
            data: { name: input.name },
        });
    }),

    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const workflow = await prisma.workflow.findUnique({
            where: { id: input.id },
        });

        if (!workflow || workflow.userId !== ctx.auth.user.id) {
            throw new TRPCError({
                code: "NOT_FOUND",
            });
        }

        return workflow;
    }),

    getMany: protectedProcedure.query(({ ctx }) => {
        return prisma.workflow.findMany({
            where: {
                userId: ctx.auth.user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }),
});