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
    // player who fished
    event.player: Minecraft.Player;
    // Items obtained from fishing
    event.itemStack: Minecraft.ItemStack / undefined;
    // fishing dimension
    event.dimension: Minecraft.Dimension;
    // fishing results
    event.result: Boolean;
});
```
