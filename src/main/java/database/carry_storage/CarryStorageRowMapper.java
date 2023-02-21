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
        int accountId = rs.getInt("accountid");
        int itemId = rs.getInt("itemid");
        int quantity = rs.getInt("quantity");
        int inventoryType = rs.getInt("inventorytype");
        long timestamp = rs.getLong("timestamp");
        return new CarryStorage(id, accountId, itemId, quantity, inventoryType, timestamp);
    }
}
