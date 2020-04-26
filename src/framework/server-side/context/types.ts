import { FastifyRequest, FastifyReply } from "fastify";

export type ContextType = {
  fastifyRequest?: FastifyRequest<any>;
  fastifyReply?: FastifyReply<any>;
  initialState?: any;
};
