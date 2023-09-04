import { Modding } from "@flamework/core";

/**
 * @metadata flamework:parameters flamework:implements
 */
export const Manager = Modding.createMetaDecorator<[config: defined]>("Class");
