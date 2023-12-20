import { world, system } from "@minecraft/server";
import playerFishingAfterEvent from "./lib/FishingEvent";

playerFishingAfterEvent.subscribe(ev => {
    const { player, itemStack, dimension, result } = ev;

    /*
    player: プレイヤーがを返します
    itemStack: アイテムが釣れた時のみ、itemStackを返します
    dimension: 釣りをしたプレイヤーのディメンションを検知
    result: 釣りに成功したかどうか
    */
});