package com.shivam.springbootcookieauth.repository;

import com.shivam.springbootcookieauth.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserInfo, Long> {
    UserInfo findByUsername(String username);
    UserInfo findFirstById(Long id);
}
