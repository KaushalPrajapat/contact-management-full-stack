package signin_jwt.signin_jwt.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.websocket.server.PathParam;
import signin_jwt.signin_jwt.models.Contact;
import signin_jwt.signin_jwt.models.Response;
import signin_jwt.signin_jwt.models.User;
import signin_jwt.signin_jwt.repositories.ContactRepo;
import signin_jwt.signin_jwt.services.Impl.ContactServiceImpl;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/contact")
public class ContactController {
    @Autowired
    private ContactServiceImpl contactService;

    @PostMapping("/save-contact")
    public ResponseEntity<?> saveContact(@RequestBody Contact contact) {
        return ResponseEntity.ok(contactService.saveContact(contact));

    }

    @GetMapping("/all-contacts")
    public List<Contact> getAllContactForOneUser() {
        User pUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(pUser);
        if (pUser != null) {
            List<Contact> contacts = contactService.getAllContactOfAUser(pUser);
            return contacts;
        }
        return null;
    }

    @SuppressWarnings("unused")
    @DeleteMapping("/delete-contact/{contact_id}")
    public ResponseEntity<?> deleteContact(@PathVariable int contact_id) {
        System.out.println(contact_id);
        User pUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Contact deleteContact = null;
        System.out.println(pUser.getEmail());
        if (pUser != null) {
            deleteContact = contactService.deleteContact(contact_id);
            return ResponseEntity.ok(deleteContact);
        } else
            return ResponseEntity.ok("Not Deleted");
    }

    @SuppressWarnings("null")
    @PutMapping("/update-contact/{contact_id}")
    public ResponseEntity<?> updateContact(@RequestBody Contact contact, @PathVariable int contact_id) {
        User pUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Response updatedContact = null;
        if (pUser != null) {
            updatedContact = contactService.updateContact(contact, contact_id, pUser);
        }
        return ResponseEntity.ok(updatedContact);
    }

    @Autowired
    ContactRepo contactRepo;

    @GetMapping("/contacts")
    public List<Contact> getContactsPage(@PathParam("pageNumber") int pageNumber) {
        User pUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int pageSize = 3;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Contact> contactOnPage  = null;
        if (pUser != null) {
            contactOnPage = contactRepo.findAllByUserUserId(pUser.getUserId(), pageable);
            System.out.println(contactOnPage);
            List<Contact> content = contactOnPage.getContent();
            return content;
        }
        return null;
    }

    @GetMapping("/contact/{cid}")
    public Contact getContact(@PathVariable int cid) {
        User pUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Contact> contact  = null;
        if (pUser != null) {
            contact = contactRepo.findById(cid);
            return contact.get();
        }
        return null;
    }

}
