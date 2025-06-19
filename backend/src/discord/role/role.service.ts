import { Injectable } from "@nestjs/common";
import { Attachment, ColorResolvable, Role, RoleManager } from "discord.js";

@Injectable()
export class RoleService {
    createTeamRole(roleManager: RoleManager, name: string, color?: ColorResolvable | null, icon?: Attachment | null): Promise<Role> {
        return roleManager.create({
            name: name,
            color: color ?? "Random",
            icon: icon ? icon.url : undefined,
            hoist: true,
            mentionable: true,
            reason: "Role created for team",
        });
    }
}
