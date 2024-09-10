package com.tiyoigusty.Data.Kendaraan.Service;

import com.tiyoigusty.Data.Kendaraan.Entity.Motorcycle;
import com.tiyoigusty.Data.Kendaraan.Repository.MotorcycleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MotorcycleService {

    @Autowired
    private MotorcycleRepo motorcycleRepo;

    @Autowired
    private ValidationService validationService;

    public Motorcycle createData(Motorcycle request) {
        validationService.validate(request);

        if(motorcycleRepo.existsById(request.getRegistration())) {
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nomor Registrasi sudah terdaftar!");
        }

        Motorcycle newData = new Motorcycle();
        newData.setRegistration(request.getRegistration());
        newData.setOwner(request.getOwner());
        newData.setBrand(request.getBrand());
        newData.setYear(request.getYear());
        newData.setSize(request.getSize());
        newData.setColor(request.getColor());
        newData.setFuel(request.getFuel());
        newData.setAddress((request.getAddress()));

        return motorcycleRepo.save(newData);
    }

    public Page<Motorcycle> getAllData(Pageable pageable) {
        return motorcycleRepo.findAll(pageable);
    }

    public Motorcycle getDataById(String id) {
        return motorcycleRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Motorcycle with registration " + id + " not found!"));
    }

    public Motorcycle updateData(String id, Motorcycle request) {
        Motorcycle motorcycle = getDataById(id);

        validationService.validate(request);

        if (request.getOwner() != null) motorcycle.setOwner(request.getOwner());
        if (request.getBrand() != null) motorcycle.setBrand(request.getBrand());
        if (request.getYear() != null) motorcycle.setYear(request.getYear());
        if (request.getSize() != null) motorcycle.setSize(request.getSize());
        if (request.getColor() != null) motorcycle.setColor(request.getColor());
        if (request.getFuel() != null) motorcycle.setFuel(request.getFuel());
        if (request.getAddress() != null) motorcycle.setAddress(request.getAddress());

        return motorcycleRepo.save(motorcycle);
    }

    public void deleteData(String id) {
        if (!motorcycleRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Motorcycle with registration " + id + " not found!");
        }
        motorcycleRepo.deleteById(id);
    }

    public List<Motorcycle> searchMotorcycles(String registration, String owner) {
        return motorcycleRepo.findByRegistrationAndOwner(registration, owner);
    }
}

