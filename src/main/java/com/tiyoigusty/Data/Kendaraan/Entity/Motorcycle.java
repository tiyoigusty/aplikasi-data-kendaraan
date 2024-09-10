package com.tiyoigusty.Data.Kendaraan.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

    @Entity
    @Data
    @Table(name = "motorcycles")
    public class Motorcycle {
        @Id
        @NotBlank(message = "Registration number cannot be blank")
        @Column(nullable = false, unique = true)
        private String registration;

        @NotBlank(message = "Owner cannot be blank")
        @Column(nullable = false)
        private String owner;

        @NotBlank(message = "Brand cannot be blank")
        @Column(nullable = false)
        private String brand;

        @NotNull(message = "Year cannot be null")
        @Positive(message = "Year must be positive")
        @Column(nullable = false)
        private Integer year;

        @NotNull(message = "Size cannot be null")
        @Positive(message = "Size must be positive")
        @Column(nullable = false)
        private Integer size;

        @NotBlank(message = "Color cannot be blank")
        @Column(nullable = false)
        private String color;

        @NotBlank(message = "Fuel type cannot be blank")
        @Column(nullable = false)
        private String fuel;

        @NotBlank(message = "Address cannot be blank")
        @Column(nullable = false)
        private String address;
    }
