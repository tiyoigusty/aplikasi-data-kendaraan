package com.tiyoigusty.Data.Kendaraan.Controller;

import com.tiyoigusty.Data.Kendaraan.Entity.Motorcycle;
import com.tiyoigusty.Data.Kendaraan.Model.WebResponse;
import com.tiyoigusty.Data.Kendaraan.Service.MotorcycleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/api/motorcycles")
public class MotorcycleController {
    @Autowired
    private MotorcycleService motorcycleService;

    @PostMapping
    public ResponseEntity<WebResponse<Motorcycle>> create(@Valid @RequestBody Motorcycle request) {
        Motorcycle motorcycle = motorcycleService.createData(request);
        WebResponse<Motorcycle> response = WebResponse.<Motorcycle>builder()
                .data(motorcycle)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @GetMapping
    public ResponseEntity<WebResponse<Page<Motorcycle>>> getAllData(Pageable pageable) {
        Page<Motorcycle> motorcycles = motorcycleService.getAllData(pageable);
        WebResponse<Page<Motorcycle>> response = WebResponse.<Page<Motorcycle>>builder()
                .data(motorcycles)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WebResponse<Motorcycle>> getDataById(@PathVariable String id) {
        Motorcycle motorcycle = motorcycleService.getDataById(id);
        WebResponse<Motorcycle> response = WebResponse.<Motorcycle>builder()
                .data(motorcycle)
                .build();
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<WebResponse<Motorcycle>> update(@PathVariable String id,@Valid @RequestBody Motorcycle request) {
        Motorcycle motorcycle = motorcycleService.updateData(id, request);
        WebResponse<Motorcycle> response = WebResponse.<Motorcycle>builder()
                .data(motorcycle)
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<WebResponse<Void>> delete(@PathVariable String id) {
        motorcycleService.deleteData(id);
        WebResponse<Void> response = WebResponse.<Void>builder().build();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<WebResponse<List<Motorcycle>>> search(
            @RequestParam(required = false, defaultValue = "") String registration,
            @RequestParam(required = false, defaultValue = "") String owner
    ) {
        List<Motorcycle> motorcycles = motorcycleService.searchMotorcycles(registration, owner);
        WebResponse<List<Motorcycle>> response = WebResponse.<List<Motorcycle>>builder()
                .data(motorcycles)
                .build();
        return ResponseEntity.ok(response);
    }
}
