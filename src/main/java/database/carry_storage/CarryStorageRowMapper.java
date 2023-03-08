package database.carry_storage;

import model.CarryStorage;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CarryStorageRowMapper implements RowMapper<CarryStorage> {

    @Override
    public CarryStorage map(ResultSet rs, StatementContext ctx) throws SQLException {
        int id = rs.getInt("id");
        int accountId = rs.getInt("account_id");
        int itemId = rs.getInt("item_id");
        int quantity = rs.getInt("quantity");
        int inventoryType = rs.getInt("inventory_type");
        long timestamp = rs.getLong("timestamp");
        return new CarryStorage(id, accountId, itemId, quantity, inventoryType, timestamp);
    }
}
