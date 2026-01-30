package com.recirclemart.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Component
public class FileUtil {

    @Value("${file.upload-dir}")
    private String uploadDir;

    // Save file like multer and return DB path
    public String saveFile(MultipartFile file) throws IOException {

        if (file == null || file.isEmpty()) {
            return null;
        }

        // Create uploads folder if not exists
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // Unique filename (same behavior as multer storage)
        String originalName = file.getOriginalFilename();
        String extension = "";

        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(originalName.lastIndexOf("."));
        }

        String fileName = UUID.randomUUID().toString() + extension;

        File dest = new File(dir, fileName);
        file.transferTo(dest);

        // This path is stored in DB and sent to frontend
        // Frontend will load: http://localhost:8080/uploads/filename.jpg
        return "/uploads/" + fileName;
    }

    // Optional: delete file (when deleting listing / image)
    public void deleteFile(String path) {
        if (path == null) return;

        try {
            String fullPath = uploadDir + path.replace("/uploads/", "");
            File file = new File(fullPath);
            if (file.exists()) {
                file.delete();
            }
        } catch (Exception ignored) {
        }
    }
}
