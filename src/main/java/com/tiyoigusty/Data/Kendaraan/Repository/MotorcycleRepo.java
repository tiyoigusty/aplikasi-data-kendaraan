package com.tiyoigusty.Data.Kendaraan.Repository;

import com.tiyoigusty.Data.Kendaraan.Entity.Motorcycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MotorcycleRepo extends JpaRepository<Motorcycle, String> {
    List<Motorcycle> findByRegistrationAndOwner(
            @Param("registration") String registration,
            @Param("owner") String owner
    );
}
