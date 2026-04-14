package com.RajawatElectrical.Repository;

import com.RajawatElectrical.Model.ServiceBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceBookingRepository extends JpaRepository<ServiceBooking,Long>
{

}
