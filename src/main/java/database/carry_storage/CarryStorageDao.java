package database.carry_storage;

import database.DaoException;
import model.CarryStorage;
import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.JdbiException;
import tools.DatabaseConnection;

import java.util.List;
import java.util.Set;
import java.util.Optional;

public class CarryStorageDao {

    public void save(CarryStorage cs) {
        try (Handle handle = DatabaseConnection.getHandle()) {
            handle.createUpdate(
                    "INSERT INTO carry_storage (`account_id`, `item_id`, `quantity`, `inventory_type`, `timestamp`) VALUES (?,?,?,?,?)")
                    .bind(0, cs.accountId())
                    .bind(1, cs.itemId())
                    .bind(2, cs.quantity())
                    .bind(3, cs.inventoryType())
                    .bind(4, cs.timestamp())
                    .execute();
        } catch (JdbiException e) {
            throw new DaoException("Failed to save note: %s".formatted(cs.toString()), e);
        }
    }

    public Optional<CarryStorage> findByItemId(int accountId, int itemId) {
        try (Handle handle = DatabaseConnection.getHandle()) {
            return handle.createQuery("SELECT * FROM carry_storage WHERE `account_id` = ? AND `item_id` = ?")
                    .bind(0, accountId)
                    .bind(1, itemId)
                    .mapTo(CarryStorage.class)
                    .findOne();
        } catch (JdbiException e) {
            throw new DaoException("Failed to find notes sent to: %s".formatted(accountId), e);
        }
    }

    public List<CarryStorage> findByItemIds(int accountId, Set<Integer> itemIds) {
        try (Handle handle = DatabaseConnection.getHandle()) {
            return handle
                    .createQuery(
                            "SELECT * FROM carry_storage WHERE `account_id` = :accountId AND `item_id` IN (<itemIds>)")
                    .bind("accountId", accountId)
                    .bindList("itemIds", itemIds)
                    .mapTo(CarryStorage.class)
                    .list();
        } catch (JdbiException e) {
            throw new DaoException("Failed to find notes sent to: %s".formatted(accountId), e);
        }
    }

    public void updateQuantityById(int id, int quantity) {
        try (Handle handle = DatabaseConnection.getHandle()) {
            handle.createUpdate(
                    "update carry_storage set quantity = quantity + ? where id = ?")
                    .bind(0, quantity)
                    .bind(1, id)
                    .execute();
        } catch (JdbiException e) {
            throw new DaoException("Failed to save note: %s".formatted(id), e);
        }
    }
}
