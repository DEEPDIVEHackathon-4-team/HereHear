package com.goormthon.backend.utils;

import java.io.IOException;
import java.util.Base64;

import org.springframework.web.multipart.MultipartFile;

public class FileUtils {

  public static String convertToBase64(MultipartFile file) throws IOException {
        // Get the byte array from the MultipartFile
        byte[] fileBytes = file.getBytes();

        // Encode the byte array to Base64
        return Base64.getEncoder().encodeToString(fileBytes);
    }
}
