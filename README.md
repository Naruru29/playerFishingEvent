# playerFishingEvent

ScriptAPIに釣りイベントを追加するライブラリ

```ts
import playerFishingAfterEvent from "./lib/FishingEvent";

// 釣りイベントを登録
playerFishingAfterEvent.subscribe((event) => {
    // 釣りをしたプレイヤー
    event.player: Minecraft.Player;
    // 釣ったアイテム
    event.itemStack: Minecraft.ItemStack / undefind;
    // 釣りをしたディメンション
    event.dimension: Minecraft.Dimension;
    // 釣りの結果
    event.result: Boolean;
});
```

A library that adds fishing events to ScriptAPI

```ts
import playerFishingAfterEvent from "./lib/FishingEvent";

// Subscribe to the fishing event
playerFishingAfterEvent.subscribe((event) => {
    // Player who went fishing
    event.player: Minecraft.Player;
    // ItemStack of the caught item, or undefined if no item was caught
    event.itemStack: Minecraft.ItemStack / undefined;
    // Dimension where the fishing occurred
    event.dimension: Minecraft.Dimension;
    // Result of the fishing (true if an item was caught, false otherwise)
    event.result: Boolean;
});
```
