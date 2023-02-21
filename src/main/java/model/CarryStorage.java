package model;

import java.util.Objects;

public record CarryStorage(int id, int accountId, int itemId, int quantity, int inventoryType,
        long timestamp) {

    private static final int PLACEHOLDER_ID = -1;

    public CarryStorage {
        Objects.requireNonNull(accountId);

        Objects.requireNonNull(itemId);
        Objects.requireNonNull(quantity);
        Objects.requireNonNull(inventoryType);
    }

    public static CarryStorage createNormal(int accountId, int itemId, int quantity, int inventoryType,
            long timestamp) {
        return new CarryStorage(PLACEHOLDER_ID, accountId, itemId, quantity, inventoryType, timestamp);
    }

}
