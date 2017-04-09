package com.electronicarmory.armory.service.mapper;

import com.electronicarmory.armory.domain.*;
import com.electronicarmory.armory.service.dto.ProgramDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Program and its DTO ProgramDTO.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class, })
public interface ProgramMapper {

    ProgramDTO programToProgramDTO(Program program);

    List<ProgramDTO> programsToProgramDTOs(List<Program> programs);

    @Mapping(target = "resources", ignore = true)
    @Mapping(target = "disciplines", ignore = true)
    Program programDTOToProgram(ProgramDTO programDTO);

    List<Program> programDTOsToPrograms(List<ProgramDTO> programDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Program programFromId(Long id) {
        if (id == null) {
            return null;
        }
        Program program = new Program();
        program.setId(id);
        return program;
    }
    

}
