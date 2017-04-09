package com.electronicarmory.armory.service.mapper;

import com.electronicarmory.armory.domain.*;
import com.electronicarmory.armory.service.dto.DisciplineDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Discipline and its DTO DisciplineDTO.
 */
@Mapper(componentModel = "spring", uses = {ProgramMapper.class, })
public interface DisciplineMapper {

    DisciplineDTO disciplineToDisciplineDTO(Discipline discipline);

    List<DisciplineDTO> disciplinesToDisciplineDTOs(List<Discipline> disciplines);

    @Mapping(target = "resources", ignore = true)
    Discipline disciplineDTOToDiscipline(DisciplineDTO disciplineDTO);

    List<Discipline> disciplineDTOsToDisciplines(List<DisciplineDTO> disciplineDTOs);

    default Program programFromId(Long id) {
        if (id == null) {
            return null;
        }
        Program program = new Program();
        program.setId(id);
        return program;
    }
}
