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

    async deleteRoleByName(roleManager: RoleManager, name: string): Promise<void> {
        const role = await roleManager.fetch().then((roles) => roles.find((r) => r.name === name));
        if (!role) {
            return Promise.resolve();
        }
        await role.delete("Team got deleted");
    }
}
