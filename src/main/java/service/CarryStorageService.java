package service;

import client.Character;
import client.inventory.InventoryType;
import database.DaoException;
import database.carry_storage.CarryStorageDao;
import model.CarryStorage;
import net.packet.out.ShowNotesPacket;
import net.server.Server;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Optional;

public class CarryStorageService {
    private static final Logger log = LoggerFactory.getLogger(CarryStorageService.class);

    private final CarryStorageDao carryDao;

    public CarryStorageService(CarryStorageDao carryDao) {
        this.carryDao = carryDao;
    }

    /**
     * Send normal note from one character to another
     *
     * @return Send success
     */
    public boolean SaveItems(int accountId, InventoryType t, Map<Integer, Integer> items) {
        try {
            Set<Integer> itemIds = items.keySet();
            List<CarryStorage> updateStorages = this.carryDao.findByItemIds(accountId, itemIds);
            for (Integer itemId : itemIds) {
                int amount = items.get(itemId);
                Optional<CarryStorage> storage = updateStorages.stream().filter(s -> s.itemId() == itemId).findFirst();
                if (storage.isPresent()) {
                    CarryStorage s = storage.get();
                    this.carryDao.updateQuantityById(s.id(), amount);
                } else {
                    CarryStorage s = CarryStorage.createNormal(accountId, itemId, amount, t.ordinal(),
                            Server.getInstance().getCurrentTime());
                    this.carryDao.save(s);
                }
            }
            return true;
        } catch (DaoException e) {
            log.error("Failed to save items to char  {}", accountId, e);
            return false;
        }
    }

    public boolean TakeoutItem(int accountId, InventoryType t, int itemId, int amount) {
        try {
            Optional<CarryStorage> storage = carryDao.findByItemId(accountId, itemId);
            if (storage.isPresent()) {
                CarryStorage s = storage.get();
                if (s.quantity() < amount) {
                    return false;
                }
                this.carryDao.updateQuantityById(s.id(), -amount);
            } else {
                return false;
            }
            return true;
        } catch (DaoException e) {
            log.error("Failed to take out item to char {}", accountId, e);
            return false;
        }
    }

    public int GetStorageCount(int accountId, int itemId) {
        try {
            Optional<CarryStorage> storage = carryDao.findByItemId(accountId, itemId);
            if (storage.isPresent()) {
                CarryStorage s = storage.get();
                return s.quantity();
            }
            return 0;
        } catch (DaoException e) {
            log.error("Failed to take out item to char {}", accountId, e);
            return 0;
        }
    }

}
