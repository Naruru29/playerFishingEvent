import { world, system } from "@minecraft/server";

const callbacks = new Map();
const playerFishing = new Map();

export default class playerFishingAfterEvent {
    callback = () => { };
    constructor(callback) {
        this.callback = callback;
        callbacks.set(this.callback, true);
    };
    static subscribe(callback) {
        new playerFishingAfterEvent(callback);
    }
    static unsubscribe(callback) {
        callbacks.delete(callback);
    };
};

world.beforeEvents.itemUse.subscribe(ev => {
    const { itemStack, source } = ev;
    const id = source.id;

    if (itemStack.typeId === "minecraft:fishing_rod") {
        if (playerFishing.get(id)) {
            system.runTimeout(() => {
                delete playerFishing.delete(id);
            }, 2);
            return;
        };
        playerFishing.set(id, "");
    };
});

world.afterEvents.entitySpawn.subscribe(ev => {
    const { cause, entity } = ev;

    if (entity.typeId === "minecraft:fishing_hook") {
        const keys = [...playerFishing.keys()];
        if (keys.length > 0) {
            const lastKey = keys[keys.length - 1];
            playerFishing.set(lastKey, entity.id);
        };
    };
});

world.beforeEvents.entityRemove.subscribe(ev => {
    const { removedEntity } = ev;

    if (removedEntity.typeId === "minecraft:fishing_hook") {
        let event = {
            player: null,
            itemStack: null,
            dimension: removedEntity.dimension,
            result: null,
        };

        const item = removedEntity.dimension.getEntities({ location: removedEntity.location, minDistance: 0, maxDistance: 0.2 })[1];
        const keys = [...playerFishing.keys()];
        if (!item) {
            event.itemStack = item ? item.getComponent("item").itemStack : undefined;
            for (const key of keys) {
                if (playerFishing.get(key) == removedEntity.id) {
                    event.result = false;
                    for (const player of world.getAllPlayers()) {
                        if (player.id === key) {
                            event.player = player;
                        };
                    };
                    delete playerFishing.delete(key);
                };
            };
        } else if (item.typeId === "minecraft:item") {
            event.itemStack = item ? item.getComponent("item").itemStack : undefined;
            for (const key of keys) {
                if (playerFishing.get(key) == removedEntity.id) {
                    event.result = true;
                    for (const player of world.getAllPlayers()) {
                        if (player.id === key) {
                            event.player = player;
                        };
                    };
                    delete playerFishing.delete(key);
                };
            };
        };

        callbacks.forEach((_, callback) => callback(event));
    };
});
  